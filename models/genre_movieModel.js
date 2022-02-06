module.exports = (sequelize, DataTypes)  => { 
    const {Model } = require('sequelize');
    class GenreMovie extends Model {}
    GenreMovie.init({

    }, {
        sequelize,
        modelName:"md_genres_movie",
        timestamps: false
    })
    return GenreMovie;
}