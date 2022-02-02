const db = require('../models/');
const Movies =  db.movies;
const GenresMovies = db.genres_movies;
const Genres = db.genres;

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
        
        const genre =  await GenresMovies.bulkCreate(genre_movie, {returning: true})       
            
        
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

 

const updateMovies = async(req,res)=>{

}

const disableMovies = async (req, res)=>{

} 

const findAllMovies = async (req, res) =>{
    try { 
        let movie = {}
        if(req.query.name){
            movie = await Movies.findAndCountAll({
                where:{ mov_active: true, mov_name:req.query.name },
                attributes: ['mov_id', 'mov_name', 'mov_image', 'mov_date']
            });
        }else if(req.query.genre){ 
            /*const genre = await Genres.findAll({
                where: { gen_name: req.query.genre, gen_active: true },
                attributes: ['gen_id', 'gen_name', 'gen_image']
            }); 
           if(genre.length === 0){
                res.status(400).json({ 
                    msg: "invalid genre"
                });
            } */
            console.log(Movies)
            movie =  await GenresMovies.findAndCountAll({ 
                include: [{
                    model: Movies,
                  }]
            });  
             
            //const results  = await GenresMovies.findAndCountAll() ;             
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


}

module.exports = {
    addMovies,
    updateMovies,
    disableMovies,
    findAllMovies,
    findIdMovies
}