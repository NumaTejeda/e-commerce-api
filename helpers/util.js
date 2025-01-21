const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const verifyJWT = (req, res, next) => {
  
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token.replace('Bearer ',''), process.env.FRASE_SECRETA, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.user = decoded;
      next();
    });
}

const comparePassword = async (password, password2, cb) => {
  bcrypt.compare(password, password2, (err, isMatch) => {
    if (err) return cb(err);
    cb(null,isMatch);
  });
}

const totalPedido = (cantidad, precio, descuento, impuesto) =>{
  let sumaTotal = cantidad * precio;
  if(descuento){
    sumaTotal -= sumaTotal * descuento/100;
  }
  if(impuesto){
    sumaTotal += sumaTotal * impuesto/100;
  }
  return sumaTotal;
}

module.exports = { verifyJWT, comparePassword, totalPedido }