//creación de token para los usuarios logueados
const jwt = require('jsonwebtoken');
const createJWT = ( uid='')=>{
    return new Promise((resolve, reject)=>{
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '3d'
        },(err, token)=>{
                if(err){
                    console.log(err);
                    reject('No se pudo generar el token');
                }else{
                    resolve( token );
                }
        });
    });
}

module.exports = {
    createJWT
}