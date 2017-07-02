var express = require("express"),
    passport    = require("passport"),
    User        = require("../models/user");
    
var router  = express.Router();
    

router.get("/",function(req, res) {
    res.render("home");    
});

router.get("/login", function(req,res){
   res.render("login");   
});

router.post("/login", passport.authenticate("local",

{
   successRedirect: "/camping",
   failureRedirect: "/login"
}),function(req,res){
});

router.get("/register", function(req,res){
   res.render("signup");
});

router.post("/register", function(req, res){
   // console.log("Here");
   var newuser = new User({username: req.body.username});
   User.register(newuser, req.body.password, function(err,user){
      if(err){
         req.flash("error", err.message);
         return res.redirect("/register");
      }
         // console.log(err);
      else
      {
            passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/camping");
            });
      }
   });
});

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged out!");
   res.redirect("/camping");
});


module.exports = router;