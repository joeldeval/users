const User = require('../../models/users')
const crypto = require('crypto')
const jwt = require('jsonwebtoken');

// POST auth api
exports.authenticate = (req, res, next) => {
    
    let email = req.body.email || '';
    
    // Busca el usuario si lo encuentra regresa un token
    User.findOne({ email : email }, (err, user) => {

        if (err) throw err;

        // si no encuentra al usuario manda error
        if (!user) return res.status(400).json({ message: 'Creadenciales inválidas.' });
        
        let password = req.body.password

        // verifica que las contrasenias sean iguales
        // si no son iguales manda error
        if (user.password != crypto.createHash('sha256').update(password, 'utf8').digest() )
            return res.status(400).json({ message: 'Creadenciales inválidas.' });

        // si el usuario y la contra son correctos
        // crea un token
        const token = jwt.sign(user, global.config.secret, {
            expiresIn : 60*60*24 // expira en 24 hours
        });

        // devuelve la informacion con el token en JSON
        res.json({
            message: '¡Usuario inicia sesión correctamente!',
            token: token,
            user:  {
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
            }
        });
        
    });
}