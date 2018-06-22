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

router.get('/top10', function(req, res,next) {
  Movie.find({}).limit(10).sort({imdb_score: 1}).then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.get('/between/:start_year/:end_year', function(req, res, next) {
  const {start_year, end_year} = req.params;

  const promise = Movie.find({
    year: { "$gte" : parseInt(start_year) , "$lte" : parseInt(end_year) }
  });
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

router.delete('/:movie_id', function(req, res, next) {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) => {
    if(!movie){
      next({ message: "The movie was not found." , code : 99 });
      return;
    }
    res.json({status : 1});
  })
  .catch((err) => {
    res.json(err);
  })
});




module.exports = router;
