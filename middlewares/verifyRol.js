//el rol permitodo viene de verifyRol('admin) en las rutas
const verifyRol = (rolPermitido) => {
  return (req, res, next) => {
    // const token = req.headers[authorization];
    const rol = req.user.rol;
    console.log(rol);
    if (!rol) {
      res.status(401).send({ message: 'Rol no proporsionado' });
    }

    try {
      if (!rolPermitido.includes(rol)) {
        res
          .status(403)
          .send({ message: 'No tiene permitido realizar esta accion' });
      }
      console.log('******rol verificado correctamente*******');
      next();
    } catch (err) {
      res
        .status(500)
        .send(err.message || { error: 'Ups, algo paso en verifyRol' });
    }
  };
};

module.exports = {
  verifyRol,
};
