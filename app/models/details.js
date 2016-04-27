var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Details = new Schema({
	date : Date,
	expense_cat: String,
	types : String,
	amount : Number,
});

module.exports = mongoose.model('details', Details);