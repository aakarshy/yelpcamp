var Comment = require("../models/comment");
var Campground = require("../models/campground");

module.exports = {
	isLoggedIn: function(req,res,next){
		if(req.isAuthenticated()){
			return next();
		}
		req.flash("error","You need to be logged in");
		res.redirect("/login");
	
	},
	checkCampgroundOwnership: function(req,res,next){
		if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, foundCampground){
				if(err){
					res.redirect("back");
				} 	else{
						if(foundCampground.author.id.equals(req.user._id)){
							next();
						} else {
							res.redirect("back");
						}
					}
				});
		} else{
				res.redirect("back");
			}	
	},
	checkCommentOwnership: function(req,res,next){
		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					res.redirect("back");
				} 	else{
						if(foundComment.author.id.equals(req.user._id)){
							next();
						} else {
						res.redirect("back");
					}
				}
			});
		} else{
			res.redirect("back");
		}	
	}
}