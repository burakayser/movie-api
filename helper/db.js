const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds255970.mlab.com:55970/movie-db');

    mongoose.connection.on("open" , () => {
        console.log("MongoDb connected.");
    });


    mongoose.connection.on("error" , (err) => {
        console.log("MongoDb error.", err);
    })
}