//el rol permitodo viene de verifyRol('admin) en las rutas
const verifyRol = (rolPermitido) =>{


    //fiajte que traer el rol desde cliente vrifyJWT en utils
    
    return (req, res, next)=>{
        // const token = req.headers[authorization];
        const rol = req.user.rol;
        
        if(!rol){
            res.status(401).send({message: 'Rol no proporsionado'})
        }

        try{
            if(!rolPermitido.isnclude(rol)){
                res.status(403).send({message: 'No tiene permitido realizar esta accion'});
            }
            console.log("******rol verificado correctamente*******")
            next();

        }catch(e){
            res.status(500).send({error: 'Ups, algo paso en verifyRol'})
        }
    }
}

module.exports = {
    verifyRol,
}