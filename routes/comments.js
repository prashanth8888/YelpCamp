var express = require("express"),
    Campground = require("../models/campground"),
    Comment    = require("../models/comment");
    
var router = express.Router({mergeParams: true});
var middleware = require("../middleware"); //Automatically takes the index.js by deafult - Configuration of Node

router.get("/new",middleware.isLoggedIn, function(req,res){
//   console.log(req.params.id);
   Campground.findById(req.params.id, function(err, campground){
      
      if(err)
         console.log(err);
      else{
        //  console.log(campground);
         res.render("./comments/new", {campground: campground});
      }
      
   });
});

router.post("/",middleware.isLoggedIn, function(req,res){
   
   Campground.findById(req.params.id, function(err, campground){
      if(err)
         console.log(err);
      else{
           Comment.create(req.body.comment,function(err, comment){
              if(err)
                  console.log(err);
              else{
                 //Adding author to the comment
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 comment.save();
                 campground.comments.push(comment);
                 campground.save();
                 res.redirect("/camping/" + campground._id);
              }
           });
         }
   });
   
});


//Comment Edit Routes

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    // res.send("Edit Route goes here");
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err)
            res.redirect("/camping/" + req.params.comment_id);
        else
            res.render("./comments/edit",{campgroundid: req.params.id, comment: foundComment});
    })
    
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // res.send("The Edit update route goes here");
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
    if(err)
        res.redirect("back");
    else
        res.redirect("/camping/" + req.params.id);
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership, function(req,res){
    // res.send("Delete Route goes here");
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err)
            res.redirect("back");
        else
            res.redirect("/camping/" + req.params.id);
    })
})






module.exports = router;