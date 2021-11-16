const router = require("express").Router();

const Celebrity = require('../models/Celebrity')

router.get('/celebrities', (req, res, next) => {
		
	Celebrity.find()
		.then(celebritiesFromDB => {
			// console.log(celebritiesFromDB)
			
			res.render('../views/celebrities/index.hbs', { celebrityList: celebritiesFromDB })
		})
		.catch(err => next(err))
	
});

router.get('/movies/new', (req, res, next) => {
		
	Celebrity.find()
		.then(celebritiesFromDB => {
			// console.log(celebritiesFromDB)
			
			res.render('../views/movies/new.hbs', { celebrityList: celebritiesFromDB })
		})
		.catch(err => next(err))
	
});

router.get('/movies/edit', (req, res, next) => {
		
	Celebrity.find()
		.then(celebritiesFromDB => {
			// console.log(celebritiesFromDB)
			
			res.render('../views/movies/edit.hbs', { celebrityList: celebritiesFromDB })
		})
		.catch(err => next(err))
	
});



router.get('/celebrities/new', (req, res, next) => {
	res.render('celebrities/new')
});




router.post('/celebrities', (req, res, next) => {
    const { name, occupation, catchPhrase} = req.body
//    console.log(req.body)
   Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
})
    .then(createdCelebrity => {
        // console.log(createdCelebrity)
        
        res.redirect(`/celebrities/${createdCelebrity.id}`)
    })
    .catch(err => next(err))

})



router.get('/celebrities/:id/edit', (req, res, next) => {
    const id = req.params.id
    Celebrity.findById(id)
        .then(celebrityFromDB => {
            res.render('celebrities/edit', { celebrity: celebrityFromDB })
        })
        .catch(err => next(err))
});








router.get('/celebrities/:id', (req, res, next) => {
	const id = req.params.id
	Celebrity.findById(id)
		.then(celebrityFromDB => {
			// console.log(celebrityFromDB)
			res.render('celebrities/show', { celebrity: celebrityFromDB })
		})
		.catch(err => next(err))
});

router.post('/celebrities/:id/edit', (req, res, next) => {
    const { name, occupation, catchPhrase} = req.body
    const id = req.params.id
    Celebrity.findByIdAndUpdate(id,{
        name: name,
        occupation: occupation,
        catchPhrase: catchPhrase,
    }, { new: true })
        .then(updateCelebrity => {
            // console.log(updateCelebrity)
            
            res.redirect(`/celebrities/${updateCelebrity.id}`)
        })
        .catch(err => next(err))
    })

router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id
    Celebrity.findByIdAndDelete(id)
    .then(() => {
        
        res.redirect('/celebrities')
    })
    .catch(err => {
        next(err)
    })

    
    
    

})

module.exports = router;
