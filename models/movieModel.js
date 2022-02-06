 
module.exports = (sequelize, DataTypes)  => { 
    const {Model } = require('sequelize');
    class Movie extends Model {}
    Movie.init({
        mov_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mov_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        mov_date: {
            type: DataTypes.DATE,
            allowNull: false
        }, 
        mov_rating:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mov_image:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        mov_active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }   
    },{
        sequelize,
        modelName: 'md_movie',
        timestamps: false
    });
    return Movie;
}