var express    = require('express'),
	app        = express(),
	bodyParser = require('body-parser'),
	mongoose   = require('mongoose'),
	Campground = require("./models/campground"),
	passport   = require("passport"),
	flash  	   = require("connect-flash"),
	LocalStrategy = require("passport-local"),
	Comment	   = require("./models/comment"),
	User  	   = require("./models/user"),
	seedDB     = require("./seeds"),
	methodOverride = require("method-override")

var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index")

// seedDB();
mongoose.connect("mongodb://localhost:27017/yelpcamp",{useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"))
app.use(methodOverride("_method"));
//PASSPORT CONFIGURATION

app.use(require("express-session")({
	secret:"hello there",
	resave: false,
	saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);



app.listen(1234, () =>{
	console.log("YelpCamp Server has started");
});

// app.listen('1234', () =>{
// 	console.log("YelpCamp Server has started");
// });

// Campground.create(
// 	{
// 		name: "Kheerganga", 
// 		image:"https://static.toiimg.com/photo/64354462/.jpg",
// 		description: "There is a wonderful pool up here"
// 	}, function(err,campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("Newly Created Campground: ");
// 			console.log(campground);
// 		}
// 	}); 

// var campgrounds = [
// 	{name: "Kheerganga", image:"https://static.toiimg.com/photo/64354462/.jpg"},
// 	{name: "Cherrapunji", image:"https://www.cherrapunjee.com/wp-content/uploads/2013/05/08C2416.jpg"},
// 	{name: "Spiti Valley", image:"https://static.toiimg.com/photo/49563472/.jpg"},
// 	{name: "Kheerganga", image:"https://static.toiimg.com/photo/64354462/.jpg"},
// 	{name: "Cherrapunji", image:"https://www.cherrapunjee.com/wp-content/uploads/2013/05/08C2416.jpg"},
// 	{name: "Spiti Valley", image:"https://static.toiimg.com/photo/49563472/.jpg"},
// 	{name: "Kheerganga", image:"https://static.toiimg.com/photo/64354462/.jpg"},
// 	{name: "Cherrapunji", image:"https://www.cherrapunjee.com/wp-content/uploads/2013/05/08C2416.jpg"},
// 	{name: "Spiti Valley", image:"https://static.toiimg.com/photo/49563472/.jpg"}
// ]
//PASSPORT CONFIGURATION