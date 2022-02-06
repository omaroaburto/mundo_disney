const db = require('../models'); 
const Genre = db.genres;


//crear género
const addGenre = async (req, res) =>{
    try {
        let infoGenre = {
            gen_name: req.body.name
        };
        
        const genre = await  Genre.create(infoGenre); 
        res.status(200).json({
            genre,
            msg:"genre has been created"
        });
    } catch (error) {
        res.status(500).json({
            msg: error
        });
    } 
}

//actualizar género
const updateGenre = async (req, res) =>{
    try {
        const idGenre = req.params.id; 
        const genre  = await Genre.findByPk(idGenre);
        if(!genre || genre.gen_active === false){
            res.status(400).json({
                genre,
                msg:"the character id does not exist"
            });
        }
        genre.gen_name =  req.body.name;
        await genre.save().then(
            res.status(200).json({ 
                msg:"the genre has been update"
            })
        );

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    } 
}

//desactivar género
const disableGenre = async (req, res) =>{
    try {
        const idGenre = req.params.id; 
        const genre  = await Genre.findByPk(idGenre);
        if(!genre || genre.gen_active === false){
            res.status(400).json({
                genre,
                msg:"the genre id does not exist"
            });
        }
        genre.gen_active =  false;
        await genre.save().then(
            res.status(200).json({ 
                msg:"the genre has been disabled"
            })
        );

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    } 
}

const enableGenre = async (req, res) =>{
    try {
        const idGenre = req.params.id; 
        const genre  = await Genre.findByPk(idGenre);
        if(!genre){
            res.status(400).json({
                genre,
                msg:"the genre id does not exist"
            });
        }
        genre.gen_active =  true;
        await genre.save().then(
            res.status(200).json({ 
                msg:"the genre has been enabled"
            })
        );

    } catch (error) {
        res.status(500).json({
            msg: error
        });
    } 
}

//listar género
const findAllGenre = async (req, res) =>{
    try {
        const genres = await Genre.findAndCountAll({
            where:{ gen_active: true },
            attributes: ['gen_id', 'gen_name', 'gen_image']
        });
        
        res.status(200).json({ 
            genres
        });
    } catch (error) {
        res.status(500).json({ 
            msg:'database error'
        });
    }
}

//ver genéro
const findIdGenre = async (req, res) =>{
    try {
        const idGenre = req.params.id; 
        const genre = await Genre.findByPk(idGenre); 
        if(!genre || !genre.gen_active){
            res.status(400).json({ 
                msg:'the genre id does not exist'
            });
        } 
        const { gen_id, gen_name, gen_image} = genre;
        res.status(200).json({  
            gen_id, 
            gen_name, 
            gen_image
        });
    } catch (error) {
        res.status(500).json({ 
            msg:'database error'
        });
    }
}

module.exports = {
    addGenre,
    updateGenre,
    disableGenre,
    findAllGenre,
    findIdGenre, 
    enableGenre
}