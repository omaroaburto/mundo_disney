 
module.exports = (sequelize, DataTypes) => {
    const {Model} = require('sequelize');
    class Character extends Model {}
    Character.init({
        cha_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cha_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cha_age:{
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        cha_weight:{
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        cha_image:{
            type: DataTypes.STRING(255),
            allowNull: true
        },
        cha_story:{
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        cha_active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }   
    },{
        sequelize,
        modelName: "md_character",
        timestamps: false
    });
    return Character;
}