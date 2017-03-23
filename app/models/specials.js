var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var collectionName = 'specials';

var specialsSchema = new Schema({
	special_id: Number,
	special_name: String,
	special_price: Number,
	items_ids: Array,
	quantity: Array
});


var Specials = mongoose.model('Specials', specialsSchema, collectionName);


module.exports = Specials;