var express = require('express');
var router = express.Router();

const Movie = require("../models/Movie.js");

//Save Movie
router.post('/', function(req, res, next) {
  // const { title, imdb_score, category, country, year } = req.body;
  
  // const movie = new Movie({
  //   title : title,
  //   imdb_score : imdb_score,
  //   category : category,
  //   country: country,
  //   year : year
  // });

  const movie = new Movie(req.body);
  console.log(movie);
  movie.save((err, data) => {
    if(err){
      res.json(err);
    }
    res.json(data);

  });
});

module.exports = router;
