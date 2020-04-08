var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var User = require("../models/user"); 
var middleware = require("../middleware");
//INDEX Route - Show all campgrounds

router.get("/",function(req,res){
	// Get all campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("index",{campgrounds: allCampgrounds});
		}
	})
	//res.render("campgrounds",{campgrounds:campgrounds});
});

//CREATE Route - To create new campgrounds
router.post("/",middleware.isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	//redirect back to campgrounds page
	var name = req.body.name;
	var image = req.body.image;
	var price = req.body.price;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name, price:price, image:image, description:desc, author:author};
	// Create a new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds");
		}
	})

	// campgrounds.push(newCampground);
	
})

//NEW Route - Show from to create new campground

router.get("/new", middleware.isLoggedIn, function(req,res){
	res.render("new");
})

//SHOW - shows more info about on campground

router.get("/:id", function(req,res){
	//find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			res.render("show",{campground: foundCampground});		
		}
	});
	
});

//EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(err, foundCampground){
		res.render("edit", {campground: foundCampground});	
	});
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.direct("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;

