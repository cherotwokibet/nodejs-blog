const express = require('express');
const router = express.Router();
const _= require('lodash');
const multer = require('multer');
const upload = multer({ dest: './public/images' })
const {Post,Categories}=require('../models/dbschema');



// let user = new User(_.pick(req.body, ['name', 'email', 'username','password','profileimage']));
   
router.get('/show/:id',(req, res)=> {
	const posts = Post(_.pick(req.body,['id']));

	posts.findById(req.params.id,(err, post)=>{
		res.render('show',{
  			'post': post
  		});
	});
});

router.get('/add', (req, res)=> {
	const categories = db.get('categories');

	categories.find({},{},(err, categories)=>{
		res.render('addpost',{
  			'title': 'Add Post',
  			'categories': categories
  		});
	});
});

router.post('/add', upload.single('mainimage'), (req, res)=> {
  // Get Form Values
  const title = req.body.title;
  const category= req.body.category;
  const body = req.body.body;
  const author = req.body.author;
  const date = new Date();

  // Check Image Upload
  if(req.file){
  	const mainimage = req.file.filename
  } else {
  	const mainimage = 'noimage.jpg';
  }

  	// Form Validation
	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check Errors
	const errors = req.validationErrors();

	if(errors){
		res.render('addpost',{
			"errors": errors
		});
	} else {
		const posts = db.get('posts');
		posts.insert({
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"author": author,
			"mainimage": mainimage
		}, (err, post)=>{
			if(err){
				res.send(err);
			} else {
				req.flash('success','Post Added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});


router.post('/addcomment', (req, res)=> {
  // Get Form Values
  const name = req.body.name;
  const email= req.body.email;
  const body = req.body.body;
  const postid= req.body.postid;
  const commentdate = new Date();

  	// Form Validation
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required but never displayed').notEmpty();
	req.checkBody('email','Email is not formatted properly').isEmail();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check Errors
	const errors = req.validationErrors();

	if(errors){
		let posts = db.get('posts');
		posts.findById(postid, function(err, post){
			res.render('show',{
				"errors": errors,
				"post": post
			});
		});
	} else {
		let comment = {
			"name": name,
			"email": email,
			"body": body,
			"commentdate": commentdate
		}

		let posts = db.get('posts');

		posts.update({
			"_id": postid
		},{
			$push:{
				"comments": comment
			}
		}, (err, doc)=>{
			if(err){
				throw err;
			} else {
				req.flash('success', 'Comment Added');
				res.location('/posts/show/'+postid);
				res.redirect('/posts/show/'+postid);
			}
		});
	}
});

module.exports = router;