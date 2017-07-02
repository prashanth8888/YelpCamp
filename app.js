var express     = require("express");
var app         = express();
var bodyParser  = require("body-parser");
var seedDB      = require("./seeds");
var mongoose    = require("mongoose");
var passport    = require("passport");
var localStrategy    = require("passport-local");
var flash       = require("connect-flash");
var methodOverride = require("method-override");
var User        = require("./models/user");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

//Routes Setup

var campgroundRoutes = require("./routes/camping"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index"),
    errorRoute       = require("./routes/error");

// //Setup
// mongoose.connect("mongodb://localhost/yelp_camp_v12_1");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(flash());
app.locals.moment = require("moment");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

app.use(session({
    secret: 'With great power comes great responsibility! Trust me about it',
    resave: false,
    saveUninitialized: false,    
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie:{maxAge: 180 * 60 * 1000}
}));

//Setup
// mongoose.connect("mongodb://localhost/yelp_camp_v12_1");
// "mongodb://<dbuser>:<dbpassword>@ds029705.mlab.com:29705/yelpcamp-ub-test"
// process.env.DATABASEURL
mongoose.connect(process.env.DATABASEURL);


seedDB();


app.use(require("express-session")({
   secret: "With great power comes great responsibility! Trust me about it",
   resave: false,
   saveUninitialized: false
}));

//PASSPORT SETUP
app.use(passport.initialize());
app.use(passport.session());

//Auto forwarding the User Object
app.use(function(req,res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/",indexRoutes);
app.use("/camping", campgroundRoutes);
app.use("/camping/:id/comments", commentRoutes);
app.use("*",errorRoute);




app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Application started!!!"); 
});