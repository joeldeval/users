const User = require('../../../models/users')
const ObjectID = require('mongodb').ObjectID;

/** GET all user. */
exports.all = (req, res, next) => {
    
    // obtiene el id del usuario que realiza la peticion
    const idUser = new ObjectID(req.user._doc._id);

    // obtiene todos los registros excepto el registro del usuario que hace la peticion
    User.find().select('name lastname email username created_at updated_at').where("_id").ne(idUser).exec((err, users) => {

        // en caso de error response con status 500 y descripcion del error
        if (err) return res.status(500).jsonp({ message: err.message});

        // devuelve la informacion correctamente
        res.json({
            message: '¡Listado de usuarios!',
            users: users
        });
    })
}