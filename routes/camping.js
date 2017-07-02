var express = require("express"),
    Campground = require("../models/campground");

var router  = express.Router();
var middleware = require("../middleware");
var geocoder = require("geocoder");

router.get("/",function(req, res) {
   Campground.find({}, function(err, allCampGrounds){
      if(err)
            console.log(err);
      else
            res.render("./campgrounds/index",{campgroundData: allCampGrounds}); 
   });
});

router.post("/",middleware.isLoggedIn,function(req, res) {
   //Process the Post method here
   var name = req.body.campname;
   var imageurl = req.body.imageurl;
   var price = req.body.price;
   
   var location = "Address unknown";
   var lat = 99.99;
   var lng = 99.99;
   geocoder.geocode(req.body.location, function (err, data) {
    if(!err){
          lat = data.results[0].geometry.location.lat;
          lng = data.results[0].geometry.location.lng;
          location = data.results[0].formatted_address;
    }
   var description = req.body.description;
   var author = {
      id: req.user._id,
      username: req.user.username
   }
   // console.log(author);
   var newCampingGround = {name: name, image : imageurl, price: price, description: description,author:author,location: location, lat: lat, lng: lng};
   // console.log(newCampingGround);
   Campground.create(newCampingGround, function(err, newlyCreatedCampingGround){
      if(err)
            console.log(err);
      else
            res.redirect("/camping");
      });
   });
});

router.get("/newcamp",middleware.isLoggedIn,function(req, res) {
   res.render("./campgrounds/new"); 
});

router.get("/:id",function(req, res) {
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampGround){
      if(err)
          console.log(err);
      else{
        //   console.log("Passed onto next page");
         //  console.log(foundCampGround);
          res.render("./campgrounds/show",{campground: foundCampGround});
      }
   });
});

//Edit and Delete the campgrounds
router.get("/:id/edit",middleware.isAuthorized, function(req, res) {
Campground.findById(req.params.id, function(err, foundCampground){
   if(err)
      console.log(err);
   else
      res.render("./campgrounds/edit",{campground: foundCampground});
});
});


router.put("/:id", middleware.isAuthorized, function(req, res) {
   
   
   var location = "Address unknown";
   var lat = 99.99;
   var lng = 99.99;
   console.log(req.body.campground.location);
   geocoder.geocode(req.body.campground.location, function (err, data) {
    if(err){
       
    }
    else{
          lat = data.results[0].geometry.location.lat;
          lng = data.results[0].geometry.location.lng;
          location = data.results[0].formatted_address;
         //  console.log(lat + "," + lng + "," + location);
    }
   
   
   var name = req.body.campground.name;
   var imageurl = req.body.campground.image;
   var price = req.body.campground.price;
   var description = req.body.campground.description;
   
   var author = {
      id: req.user._id,
      username: req.user.username
   }
   // console.log(author);
   // console.log("Just before update " + lat + "," + lng + "," + location);
   var updatedCampground = {name: name, image : imageurl, price: price, description: description,author:author,location: location, lat: lat, lng: lng}; 
   Campground.findByIdAndUpdate(req.params.id, updatedCampground, function(err, updatedCampground){
      if(err)
         res.redirect("/camping")
      else{
         res.redirect("/camping/" + updatedCampground._id);
      }
      });    
   });
});


router.delete("/:id",middleware.isAuthorized,function(req, res) {
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err)
         res.redirect("/camping");
      else 
         res.redirect("/camping");
   })
});


module.exports = router;