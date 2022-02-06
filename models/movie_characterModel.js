
module.exports = (sequelize, DataTypes)  => { 
    const {Model } = require('sequelize');
    class MovieCharacter extends Model {}
    MovieCharacter.init({

    }, {
        sequelize,
        modelName:"md_movies_character",
        timestamps: false
    });
    return MovieCharacter;
}