 
module.exports = (sequelize, DataTypes) => { 
    const {Model } = require('sequelize');
    class User extends Model {}
    User.init( {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        user_email:{
            type: DataTypes.STRING(320),
            unique: true,
            allowNull: false
        },
        user_password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    
    },{
        sequelize,
        modelName: 'md_user',
        timestamps: false
    });
    return User;
}