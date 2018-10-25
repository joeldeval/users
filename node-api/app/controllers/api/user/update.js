const User = require('../../../models/users');
const crypto = require('crypto');
const { validationResult, checkSchema } = require('express-validator/check');

/** PUT update user. */
exports.update = (req, res, next) => {

    // obtiene errores del request
    const oErrors = validationResult(req);

    // en caso de tener errores responde con un status 400 y descripcion de errores
    if (!oErrors.isEmpty()) return res.status(400).json(oErrors.mapped());

    // busca el usuario por su ID
    User.findById(req.body._id, function (err, oUser) {
        
        // en caso de no encontrar el registro responde con status 400 y descripción del error
        if (!oUser) return res.status(400).jsonp({ message: 'Usuario no encontrado.' });

        // empata la información a actualizar
        oUser.name = req.body.name
        oUser.lastname = req.body.lastname
        oUser.username = req.body.username
        oUser.email = req.body.email
        // verifica si contiene la contraseña en caso de tener una nueva encripta sino asigna la que tenía
        oUser.password = (req.body.password) ? crypto.createHash('sha256').update(req.body.password, 'utf8').digest() : oUser.password

        // guarda el registro en base de datos
        oUser.save((err) => {

            // en caso de tener errores response con status 400 y descripción del error
            if (err) return res.status(400).jsonp({
                    message: (err.name === 'MongoError' && err.code === 11000) ? 'El correo electrónico ya está en uso.' : errorHandler.getErrorMessage(err)
                });

            // devuelve la informacion correctamente
            res.jsonp({
                _id: oUser._id,
                name: oUser.name,
                lastname: oUser.lastname,
                username: oUser.username,
                email: oUser.email,
                created_at: oUser.created_at,
                updated_at: oUser.updated_at
            })
        });
    });
    
}

/** MIDDLEWARE validator update user. */
exports.validator = checkSchema({
    _id: {
        isEmpty: {
            errorMessage: 'El id no puede estar vacío.',
            negated: true
        }
    },
    email: {
        isEmail: {
            errorMessage: 'Debe ser un correo electrónico válido.',
        }
    },
    password: {
        optional: true,
        isLength: {
            errorMessage: 'La contraseña debe contener más de 7 caracteres.',
            options: { min: 7 },
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