const req = require('express/lib/request');
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

const findCharacter = async (req, res) =>{
    try {
        let characters = {};
        if(req.query.name){
            characters = await Character.findAndCountAll({
                where:{ cha_active: true, cha_name:req.query.name },
                attributes: ['cha_id', 'cha_name', 'cha_image', 'cha_date']
            });
        }else if(req.query.age){
            characters = await Character.findAndCountAll({
                where:{ cha_active: true, cha_age:req.query.age },
                attributes: ['cha_id', 'cha_name', 'cha_image', 'cha_date']
            });
        }else if(req.query.idMovie){
            const movie = await Movies.findByPk(req.query.idMovie);
            if(!movie){
                res.status(400).json({ 
                    msg:"invalid id movie"
                });
            }

            const idCharacters =  await CharactersMovies.findAll({ 
                where:{
                    gen_id: req.query.idMovie 
                },
                attributes: ['cha_id']
            });
            let aux = []
            for (let index = 0; index <idCharacters.length; index++) {
                aux.push(idCharacters[index].cha_id)
                
            }

            characters = await Character.findAll({
                where:{
                    cha_id:{
                        [Op.in]: aux
                    },
                    cha_active: true
                }
            })

            res.status(200).json({
                movie,
                characters
            });
            
        }else{
            characters = await Character.findAndCountAll({
                where:{ cha_active: true},
                attributes: ['cha_id', 'cha_name', 'cha_image', 'cha_date']
            });
        }

        res.status(200).json({ 
            characters
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            msg:'database error' 
        });
    }
}

const findIdCharacter = async (req, res) => {
    const character = await Character.findByPk(req.params.id)
    res.status(200).json({ 
        character
    });
}

module.exports = {
    addCharacter,
    updateCharacter,
    disableCharacter,
    enableCharacter,
    findCharacter,
    findIdCharacter
}