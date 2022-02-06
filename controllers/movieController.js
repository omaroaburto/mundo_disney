const db = require('../models/');
const Movies =  db.movies;
const GenresMovies = db.genres_movies;
const Genres = db.genres;
const Op = db.Op;

//crear película
const addMovies = async (req,res)=>{
   try {
        let infoMovies = {
            mov_name: req.body.name,
            mov_date: req.body.date,
            mov_rating: req.body.rating
        }
        
        let genreMovie = req.body.genre || []; 
        if(genreMovie.length === 0) {
            res.status(400).json({ 
                msg:'the movie has not genre'
            });
        }
        const movie = await Movies.create(infoMovies)
        let genre_movie = []
        
        
        for(let aux of genreMovie){
                genre_movie.push({
                    gen_id: aux,
                    mov_id: movie.mov_id
                })
        }   
        
        await GenresMovies.bulkCreate(genre_movie, {returning: true})       
            
        const genre = await Genres.findAll({
            where:{
                gen_id:{
                    [Op.in]: genreMovie
                }
            }
        });
        res.status(200).json({
            movie,
            genre,
            msg:'the movie has been created'
        });     
   } catch (error) {
        res.status(400).json({ 
            msg:'enter the corresponding data'
        });
   }
}
 
//actualizar película
const updateMovies = async(req,res)=>{
    try {
        const idMovie = req.params.id; 
        const movie  = await Movies.findByPk(idMovie);
        //consulta si existe o si esta habilitada la película
        if(!movie || movie.mov_active === false){
            res.status(400).json({
                genre,
                msg:"the movie id doesn't exist"
            });
        }
        movie.mov_name =  req.body.name;
        movie.mov_date = req.body.date;
        movie.mov_rating = req.body_rating;

        await movie.save().then(
            res.status(200).json({ 
                msg:"the movie has been update"
            })
        );

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    } 
}

//desactivar película
const disableMovies = async (req, res) =>{
    try {
        const idMovie = req.params.id; 
        const movie  = await Movies.findByPk(idMovie);
        if(!movie|| genre.mov_active === false){
            res.status(400).json({
                genre,
                msg:"the movie id doesn't exist"
            });
        }
        movie.mov_active =  false;
        await movie.save().then(
            res.status(200).json({ 
                msg:"the movie has been disabled"
            })
        );

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    } 
}

//activar película 
const enableMovies = async (req, res) =>{
    try {
        const idMovie = req.params.id; 
        const movie  = await Movies.findByPk(idMovie);
        if(!movie){
            res.status(400).json({
                genre,
                msg:"the movie id doesn't exist"
            });
        }
        movie.mov_active =  true;
        await movie.save().then(
            res.status(200).json({ 
                msg:"the movie has been enabled"
            })
        );

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    } 
}

//función para encontrar una película por diferentes query
//Por nombre, género, fecha ASC o DESC y mostrar toda las películas
const findAllMovies = async (req, res) =>{
    try { 
        let movie = {}
        if(req.query.name){
            movie = await Movies.findAndCountAll({
                where:{ mov_active: true, mov_name:req.query.name },
                attributes: ['mov_id', 'mov_name', 'mov_image', 'mov_date']
            });
        }else if(req.query.genre){ 
            console.log(req.query.genre)
            const genre = await Genres.findAll({
                where: { gen_name: req.query.genre, gen_active: true },
                attributes: ['gen_id']
            }); 
           if(genre.length===0){
                res.status(400).json({ 
                    msg: "invalid genre"
                });
            } 

            const idMovies =  await GenresMovies.findAll({ 
                where:{
                    gen_id: genre[0].gen_id  
                },
                attributes: ['mov_id']
            })
            let aux = []
            for (let index = 0; index <idMovies.length; index++) {
                aux.push(idMovies[index].mov_id)
                
            }
            movie =  await Movies.findAll({
                where:{
                    mov_id:{
                        [Op.in]: aux
                    },
                    mov_active: true
                }
            })              
        }else if(req.query.order){
            if(req.query.order=='DESC' || req.query.order=='ASC'){
                movie = await Movies.findAndCountAll({
                    where:{ mov_active: true },
                    order:[['mov_date', req.query.order]],
                    attributes: ['mov_id', 'mov_name', 'mov_image', 'mov_date']
                });
            }else{
                res.status(400).json({ 
                    msg:'invalid search'  
                });
            }
           
        }else{
            movie = await Movies.findAndCountAll({
                where:{ mov_active: true },
                attributes: ['mov_id', 'mov_name', 'mov_image', 'mov_date']
            });
        }
        
        
        res.status(200).json({ 
            movie
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            msg:'database error' 
        });
    }
}

const findIdMovies = async (req, res) =>{
    const movie = await Movies.findByPk(req.params.id)
    res.status(200).json({ 
        movie 
    });

}

module.exports = {
    addMovies,
    updateMovies,
    disableMovies,
    findAllMovies,
    findIdMovies,
    enableMovies
}