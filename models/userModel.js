module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("md_user", {
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
    
    })

    return User

}