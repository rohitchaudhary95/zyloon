var Details = require('../models/details');
var config = require('../../config');


module.exports = function(app, express){

	var api = express.Router();

	api.post('/save', function(req, res){
		var det = new Details({
			date: req.body.date,
			expense_cat: req.body.expense_cat,
			types: req.body.types,
			amount: req.body.amount
		});

		det.save(function(err){
			if(err){
				res.send(err);
				return;
			}

			res.json({
				success:true,
				message:'data saved!'
			});
		});
	});

	api.get('/show', function(req, res){
		Details.find({}, function(err, det){
			if(err){
				res.send(err);
			}

			res.json(det);
		});
	});

	api.post('/updateDet', function(req, res){
		Details.update({_id: req.body._id},{expense_cat:req.body.expense_cat,types:req.body.types,amount:req.body.amount},function(err){
			if(err){
				res.send(err);
			}
			res.json({
				success:true,
				message:'data updated!'
			});
		});
	});

	

	return api;


}