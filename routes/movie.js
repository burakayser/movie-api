var express = require('express');
var router = express.Router();

const Movie = require("../models/Movie.js");

//Save Movie
router.post('/', function(req, res, next) {
  const movie = new Movie(req.body);
  movie.save((err, data) => {
    if(err){
      res.json(err);
    }
    res.json(data);

  });
});


router.get('/', function(req, res,next) {
  Movie.find({}).then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', function(req, res, next) {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie){
      next({ message: "The movie was not found." , code : 99 });
      return;
    }
    res.json(movie);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.put('/:movie_id', function(req, res, next) {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });

  promise.then((movie) => {
    if(!movie){
      next({ message: "The movie was not found." , code : 99 });
      return;
    }
    res.json(movie);
  })
  .catch((err) => {
    res.json(err);
  })
});



module.exports = router;
