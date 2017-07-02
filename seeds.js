var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    
var data = [
    
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "With a colorful mix of Caribbean and Spanish influences, Cartagena is a jewel on Colombia’s coast and it’s only getting hotter. Adding to established hotels like the Sofitel Cartagena Santa Clara and the new Anandá Hotel Boutique, brands like Ritz-Carlton are planting their flags in this historical city, adding the allure of luxury digs to an already desirable destination"    
    },
    
    {   
        name: "Desert Mesa", 
        image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
        description: " Frankfurt, better known as one of the primary international business hubs of the world, is also the gateway city to Germany’s wine country. The area surrounding Frankfurt is world renowned for their Riesling history, stretching back to the 1200s thanks to the cool climate producing an acidic grape that comes through in the wine"
        
    },
    
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Mantua has long been an important city of art. Mantua (called Mantova in Italian) was ruled by the Gonzaga family for centuries, and they left behind sumptuous palaces, religious relics, and elaborately decorated churches. It’s the closest modern city to where Roman poet Virgil was born. Mantua will be part of the East Lombardy region’s designation as European Capital of Gastronomy in 2017"
        
    }
    ]

function seedDB(){
    // Campground.remove({}, function(err){
    //     if(err)
    //         console.log(err);
    
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err, campground){
    //         if(err)
    //             console.log(err);
    //         else{
    //             // console.log(campground);{
    //                 Comment.create({
    //                      text: "This place is great, but I wish there was internet",
    //                      author: "Homer"
    //                 }, function(err, comment){
    //                     if(err)
    //                         console.log(err);
    //                     else{
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         // console.log("Comment pushed into campground");
    //                     }
    //                         // console.log(comment);
    //                 });
    //             }
    //         });   
    //     });
    // });
}

module.exports = seedDB;

