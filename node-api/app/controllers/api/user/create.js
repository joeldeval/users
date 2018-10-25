const User = require('../../../models/users');
const crypto = require('crypto');
const { validationResult, checkSchema } = require('express-validator/check');

/** POST create user. */
exports.create = (req, res, next) => {

    // obtiene errores del request
    const oErrors = validationResult(req);
    
    // en caso de tener errores responde con un status 400 y descripcion de errores
    if (!oErrors.isEmpty()) return res.status(400).json(oErrors.mapped());
    
    // instancia un objeto para ser insertado en base de datos
    var oUser = new User()
    oUser.name = req.body.name
    oUser.lastname = req.body.lastname
    oUser.username = req.body.username
    oUser.email = req.body.email
    // encripta la constraseña
    oUser.password = crypto.createHash('sha256').update(req.body.password, 'utf8').digest()
    oUser.created_at = Date.now()
    
    // guarda el registro en base de datos
    oUser.save((err) => {

        // en caso de tener errores response con status 400 y descripción del error
        if (err) return res.status(400).jsonp({
                message: (err.name === 'MongoError' && err.code === 11000) ? 'El correo electrónico ya está en uso.' : errorHandler.getErrorMessage(err)
            });

        // devuelve la informacion correctamente
        res.status(201).jsonp({
            _id: oUser._id,
            name:   oUser.name,
            lastname: oUser.lastname,
            username: oUser.username,
            email: oUser.email,
            created_at: oUser.created_at,
            updated_at: oUser.updated_at
        })
    })
}

/** MIDDLEWARE validator create user. */
exports.validator = checkSchema({
    email: {
        isEmail: {
            errorMessage: 'Debe ser un correo electrónico válido.',
        }
    },
    password: {
        isEmpty: {
            errorMessage: 'La contraseña no puede estar vacía.',
            negated: true
        },
        isLength: {
            errorMessage: 'La contraseña debe contener más de 7 caracteres.',
            options: { min: 7 }
        }
    },
    name: {
        isEmpty: {
            errorMessage: 'El nombre no puede estar vacío.',
            negated: true
        },
        isLength: {
            errorMessage: 'El nombre debe contener más de 3 caracteres.',
            options: { min: 3 }
        }
    },
    lastname: {
        isEmpty: {
            errorMessage: 'El apellido no puede estar vacío.',
            negated: true
        },
    },
    username: {
        isEmpty: {
            errorMessage: 'El usuario no puede estar vacío.',
            negated: true
        },
        isLength: {
            errorMessage: 'El usuario debe contener más de 6 caracteres.',
            options: { min: 6 }
        }
    },
});