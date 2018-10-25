const User = require('../../../models/users')

/** DELETE user. */
exports.delete = (req, res, next) => {
    
    // busca por su ID y elimina el registro
    User.findByIdAndRemove(req.params.id, function (err) {
        
        // en caso de error response con status 500 y descripcion del error
        if (err) return res.status(500).jsonp({ message: err.message});

        // ha sido eliminado correctamente
        res.jsonp({ message: '¡Eliminado correctamente!' });
    });

}