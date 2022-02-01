
const {Sequelize, DataTypes} = require('sequelize');

//configuración de base de datos 
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERDB, process.env.PASWORDDB, {
            host: process.env.HOST,
            dialect: process.env.DIALECT,
            operatorsAliases: 0, 
            pool:{
                max: 5,
                min: 0, 
                acquire: 3000,
                idle: 10000 
            } 
}); 

sequelize.authenticate()
.then(() => {
    console.log('connected database')
})
.catch(err => {
    console.log('Error'+ err)
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Se agregan modelos de tablas
db.users = require('./userModel.js')(sequelize, DataTypes); 
db.genres = require('./genreModel.js')(sequelize, DataTypes); 
db.movies = require('./movieModel.js')(sequelize, DataTypes); 
db.characters = require('./characterModel.js')(sequelize, DataTypes); 
db.genres_movies = require('./genre_movieModel.js')(sequelize, DataTypes);
db.movies_characters = require('./movie_characterModel.js')(sequelize, DataTypes);   
/*
const Genre_Movie = sequelize.define('Genre_Movie', {}, { timestamps: false });
db.genres.belongsToMany(db.movies, { through: Genre_Movie });
db.movies.belongsToMany(db.genres, { through: Genre_Movie });
*/
//relación m x n
db.genres.belongsToMany(db.movies, { through: db.genres_movies });
db.movies.belongsToMany(db.genres, { through: db.genres_movies });


db.movies.belongsToMany(db.characters, { through: db.movies_characters });
db.characters.belongsToMany(db.movies, { through: db.movies_characters });

db.sequelize.sync({ force: false })
.then(() => {
    console.log('re-sync done!')
});

module.exports = db;