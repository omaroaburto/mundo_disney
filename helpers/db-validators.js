const db = require('../models');  
const Op = db.Op;
const User = db.users;
const Character = db.characters;
const  Genre = db.genres;
const Movie = db.movies;
//helper para validar si el email está registrado en la base de datos
const existEmail = async (email)=>{
    const user = await User.findOne({ where: { user_email: email } }); 
    if (user) {
        throw new Error(`The email ${email} is already registered`);   
    } else {
      return true;
    }
}
//valida si existe el nombre de un género
const existGenre = async (name)=>{
    const genre = await Genre.findOne({
        where:{
            gen_name: name
        }
    }); 
    if(genre){
        throw new Error(`The genre ${name} is already registered`);
    }else{
        return true;
    }
}

//valida la lista de películas asociados a un personaje
const validateGenreList = async (genre = [])=>{
    const isNumber = (x) => Number.isInteger(x);
    
    if(!genre.every(isNumber)){
        throw new Error(`invalid genres`);
    } 
    const countGenres = await Genre.count({
        where:{
            gen_id:{
                [Op.in]: genre
            }
        }
    });
 
    if(countGenres != genre.length){
        throw new Error(`one or more genders are invalid`);
    }
    else{
        return true;
    }
}
//valida si existe el id de un personaje
const existIdCharacter = async (id)=>{
    const character = await Character.findByPk(id); 
    if (character) {
        throw new Error(`El id ${id} no existe`);   
    } else {
      return true;
    }
}
//valida el rango de 
const validateRating = async (rating)=>{ 
    if (rating<1 || rating>5) {
        throw new Error(`the movies rating should be between 1 and 5`);   
    } else {
      return true;
    }
}

//valida la lista de géneros asociados a una película
const validateMoviesList = async (movies = [])=>{
    const isNumber = (x) => Number.isInteger(x);
    //validar que las pk sean de tipo entero
    if(!movies.every(isNumber)){
        throw new Error(`invalid movies`);
    } 
    const countMovies = await Movie.count({
        where:{
            mov_id:{
                [Op.in]: movies
            }
        }
    });
 
    if(countMovies != movies.length){
        throw new Error(`one or more movies are invalid`);
    }
    else{
        return true;
    }
}

const validateGenre = async (genre) =>{
     
    if(typeof genre == 'undefined')
        return true
    const gen = await Genre.count({
        where:{
            gen_name: genre
        }
    })
    if(gen !=1){
        throw new Error(`the genre doesn't exist`);
    }else{
        return true;
    }
}
module.exports = {
    existEmail,
    existIdCharacter, 
    validateRating,
    existGenre,
    validateGenreList,
    validateGenre,
    validateMoviesList
}