const mongoose = require('mongoose')
const Celebrity = require('./models/celebrity')

mongoose.connect('mongodb://localhost/movieApp')

const celebrities = [
    {
        name: "Tom Hanks",
        occupation: "Actor",
        catchPhrase: "My mama always said, life was like a box of chocolates. You never know what you're gonna get."
    },
    {
        name: "Robin Williams",
        occupation: "Actor",
        catchPhrase: "No matter what anybody tells you, words and ideas can change the world."   
    },
    {
        name: "Denzel Washington",
        occupation: "Actor",
        catchPhrase: "If you want to be a warrior, you have to train."
    }
]

Celebrity.insertMany(celebrities)
	.then(celebrities => {
		console.log(`Success! - ${celebrities.length} were added to the database`)
		mongoose.connection.close()
	})
	.catch(err => console.log(err))