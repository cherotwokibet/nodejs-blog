const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');

const {Post,Categories}=require('../models/dbschema');

mongoose.connect('mongodb://localhost/nodeblog',{useNewUrlParser:true})
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));


router.get('/show/:category', (req, res)=> {
	
	let posts = Categories(_.pick(req.body, ['name']));

	posts.find({category: req.params.category},(err, posts)=>{
		res.render('index',{
  			'title': req.params.category,
  			'posts': posts
  		});
	});
});

router.get('/add', (req, res)=> {
	res.render('addcategory',{
  		'title': 'Add Category'	
	});
});

router.post('/add', (req, res)=> {
  // Get Form Values
  const name = req.body.name;

  	// Form Validation
	req.checkBody('name','Name field is required').notEmpty();

	// Check Errors
	const errors = req.validationErrors();

	if(errors){
		res.render('addpost',{
			"errors": errors
		});
	} else {
		const categories = db.get('categories');
		categories.insert({
			"name": name,
		}, function(err, post){
			if(err){
				res.send(err);
			} else {
				req.flash('success','Category Added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

module.exports = router;