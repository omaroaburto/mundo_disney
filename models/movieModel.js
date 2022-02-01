module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define("md_movie", {
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
    })
    return Movie;
}