var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var collectionName = 'food';

var foodSchema = new Schema({
	food_id: Number,
	food_name: String,
	category_id: Number,
	quantity: Number,
	price: Number,
	special_id: Array
});


var Food = mongoose.model('Food', foodSchema, collectionName);


module.exports = Food;