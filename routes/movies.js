const router = require("express").Router();
const Movie = require('../models/Movie');

router.get('/movies', (req, res, next) => {
		
	Movie.find()
		.then(moviesFromDB => {
			// console.log(celebritiesFromDB)
			
			res.render('../views/movies/index.hbs', { movieList: moviesFromDB })
		})
		.catch(err => next(err))
	
});

router.get('/movies/new', (req, res, next) => {
	res.render('movies/new')
});




router.post('/movies', (req, res, next) => {
    const { title, genre, plot, cast} = req.body
//    console.log(req.body)
   Movie.create({
    title: title,
    genre: genre,
    plot: plot,
    cast: cast,
})
    .then(createdMovie => {
        console.log(createdMovie)
        
        res.redirect(`/movies/${createdMovie.id}`)
    })
    .catch(err => next(err))

})






router.get('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
        .then(movieFromDB => {
            res.render('movies/edit', { movie: movieFromDB })
        })
        .catch(err => next(err))
});






router.get('/movies/:id', (req, res, next) => {
	const id = req.params.id
	Movie.findById(id)
		.then(movieFromDB => {
			// console.log(celebrityFromDB)
			res.render('movies/show', { movie: movieFromDB })
		})
		.catch(err => next(err))
});

router.post('/movie/:id/edit', (req, res, next) => {
    const { title, genre, plot, cast} = req.body
    const id = req.params.id
    Movie.findByIdAndUpdate(id,{
      title: title,
      genre: genre,
      plot: plot,
      cast: cast,
    }, { new: true })
        .then(updateMovie => {
            // console.log(updateCelebrity)
            
            res.redirect(`/movies/${updateMovie.id}`)
        })
        .catch(err => next(err))
    })

router.post('/movies/:id/delete', (req, res, next) => {
    const id = req.params.id
    Movie.findByIdAndDelete(id)
    .then(() => {
        
        res.redirect('/movies')
    })
    .catch(err => {
        next(err)
    })
})

module.exports = router;