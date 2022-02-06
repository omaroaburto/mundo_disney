module.exports = (sequelize, DataTypes) => {
    const {Model } = require('sequelize');
    class Genre extends Model {}
    Genre.init({
        gen_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        gen_name: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false
        }, 
        gen_image:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        gen_active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }   
    },{
        sequelize,
        modelName: 'md_genre',
        timestamps: false
    });
    return Genre;
}