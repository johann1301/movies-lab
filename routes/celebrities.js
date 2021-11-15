const router = require("express").Router();

const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
		
	Celebrity.find()
		.then(celebritiesFromDB => {
			console.log(celebritiesFromDB)
			
			res.render('../views/Celebrities/index.hbs', { celebrityList: celebritiesFromDB })
		})
		.catch(err => next(err))
	
});

module.exports = router;
