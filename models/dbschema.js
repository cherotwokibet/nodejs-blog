const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeauth',{useNewUrlParser:true})
    .then(()=> console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...',err));


// User Schema
const PostSchema = mongoose.Schema({
	title: {
		type: String,
		index: true
	},
	body: {
		type: String
	},
	date: {
		type: Date
	},
	author: {
		type: String
	},
	mainimage:{
		type: String
	}
});
const CategoriesSchema = mongoose.Schema({
	name:{
		type:String
	}
});

const Post = mongoose.model('Post', PostSchema);
const Categories = mongoose.model('Categories', CategoriesSchema);

exports.Post = Post;
exports.Categories = Categories;