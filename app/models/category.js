var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var collectionName = 'category';

var categorySchema = new Schema({
	category_id: Number,
	category_name: String
});


var Category = mongoose.model('Category', categorySchema, collectionName);


module.exports = Category;

/*
module.exports = mongoose.model('Category', {
	category_id: {
		type: Number
	},
	category_name: {
		type: String
	}
})*/