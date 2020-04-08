var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment")

// var data = [
// 	{	
// 		name: "Kheerganga", 
// 		image:"https://static.toiimg.com/photo/64354462/.jpg",
// 		description: "There is a wonderful pool up here"
// 	},
// 	{
// 		name: "Cherrapunji", 
// 		image:"https://www.cherrapunjee.com/wp-content/uploads/2013/05/08C2416.jpg",
// 		description: "Wonderful valley"
// 	},
// 	{
// 		name: "Spiti Valley", 
// 		image:"https://static.toiimg.com/photo/49563472/.jpg",
// 		description: "Alpine Desert camping"
// 	}
// ]

// function seedDB(){
// 	// Campground.remove({},function(err){
// 	// 	if(err){
// 	// 		console.log(err);
// 	// 	}
// 	// 	console.log("removed campgrounds");
// 		data.forEach(function(seed){
// 			Campground.create(seed,function(err,campground){
// 				if(err){
// 					console.log(err);
// 				} else {
// 					console.log("Added Campground");
// 					//create a comment
// 					// Comment.create(
// 					// 	{
// 					// 		text:"This place is great, but I wishh there was internet",
// 					// 		author:"Homer"
// 					// 	}, function(err, comment){
// 					// 			if(err){
// 					// 				console.log(err);
// 					// 			} else{
// 					// 				campground.comments.push(comment);
// 					// 				campground.save();
// 					// 				console.log("Created New comment");
// 					// 			}
// 					// 	});
// 					}
// 				});
// 			})
// 		// });
// 	};

// module.exports = seedDB;