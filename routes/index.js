const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const mongoose = require('mongoose');
const db = require('monk')('localhost/nodeblog');

/* GET home page. */
router.get('/', (req, res)=> {
	//const db = req.db;
	//const posts = db.get('posts');
	
	posts.find({}, {}, (err, posts)=>{
		res.render('index', { posts: posts });
		// console.log(err);
	});
});

module.exports = router;
