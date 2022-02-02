
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
 
//relación m x n
db.genres.belongsToMany(db.movies, { through: db.genres_movies, foreignKey:  'gen_id' });
db.movies.belongsToMany(db.genres, { through: db.genres_movies, foreignKey:  'mov_id' });

 

db.movies.belongsToMany(db.characters, { through: db.movies_characters, foreignKey:  'mov_id' });
db.characters.belongsToMany(db.movies, { through: db.movies_characters, foreignKey:  'cha_id' });

db.sequelize.sync({ force: false })
.then(() => {
    console.log('re-sync done!')
});

module.exports = db;