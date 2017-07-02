var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "You don't own that comment - Try refreshing the page");
                res.redirect("back");
            }
            else
            {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "Looks like you are trying to edit the comment posted by someone else");
                    res.redirect("back");
                }
            }
                
        })
    }
    else{
        req.flash("error", "You must be logged in");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
   if(req.isAuthenticated()){
      return next();
   }
   req.flash("error", "You must be logged in");
   res.redirect("/login");
}


middlewareObj.isAuthorized = function(req,res,next){
   if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCampground){
         if(err)
            res.redirect("back");
         else{
            if(foundCampground.author.id.equals(req.user._id)){
               next();
            }
            else{
               req.flash("error", "You are not authorized");
               res.redirect("back");
            }
            
         }
      });
   }
   else{
      req.flash("error", "You must be logged in");
      res.redirect("back");
   }
}

module.exports = middlewareObj;