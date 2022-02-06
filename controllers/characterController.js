const db = require('../models'); 
const Character = db.characters;
const Op = db.Op;
const  CharactersMovies   = db.characterMovies;
const Movies =  db.movies;
const addCharacter = async (req, res)=>{

    try {
        let infoCharacter = {
            cha_name: req.body.name,
            cha_age: req.body.age,
            cha_weight: req.body.weight, 
            cha_story: req.body.story
        } 
        
        let characterMovies= req.body.movies || []; 
        if(characterMovies.length === 0) {
            res.status(400).json({ 
                msg:'the character has not associated movies'
            });
        }

        const character = await Character.create(infoCharacter)
        

        let character_movie = []
        
        
        for(let aux of characterMovies){
                character_movie.push({
                    gen_id: aux,
                    mov_id: character.cha_id
                })
        } 

        await CharactersMovies.bulkCreate(characterMovies, {returning: true})       
            
        const movies = await Movies.findAll({
            where:{
                mov_id:{
                    [Op.in]: characterMovies
                }
            }
        });

        res.status(200).json({
            movies,
            character,
            msg:"character has been created"
        }); 
    } catch (error) {
        res.status(400).json({ 
            msg: error
        });
    }
}

const updateCharacter = async (req, res)=>{
    try {
        let infoCharacter = {
            cha_name: req.body.name,
            cha_age: req.body.age,
            cha_weight: req.body.weight, 
            cha_story: req.body.story
        }

        const character =  await Character.update(infoCharacter,{
            where: {cha_id: req.params.id}
        });
        res.status(200).json({
            character,
            msg:"user has been updated"
        });
    } catch (error) {
        res.status(500).json({ 
            msg:"database error"
        });
    }
}

const disableCharacter = async (req, res)=>{
    try {
        const idUser = req.params.id;
        const character = await Character.findByPk(idUser);
        if(!character){
            res.status(400).json({ 
                msg:"the character id does not exist"
            });
        }
        character.cha_active = false;
        await character.save();
        res.status(200).json({ 
            msg:"the character has been disabled"
        });
    } catch (error) {
        
    }
}


const enableCharacter = async (req, res)=>{
    try {
        const idUser = req.params.id;
        const character = await Character.findByPk(idUser);
        if(!character){
            res.status(400).json({ 
                msg:"the character id does not exist"
            });
        }
        character.cha_active = true;
        await character.save();
        res.status(200).json({ 
            msg:"the character has been enabled"
        });
    } catch (error) {
        
    }
}

const findMovies = async (req, res) =>{
    
}

module.exports = {
    addCharacter,
    updateCharacter,
    disableCharacter,
    enableCharacter
}