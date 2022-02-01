module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("md_genre", {
        gen_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        gen_name: {
            type: DataTypes.STRING(50),
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
    })
    return Genre;
}