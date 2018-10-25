var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    /*
     * Verifica si en los Headers se encuentra la propiedad authorization
     */
    if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ) {
        try {
            /*
             * Intenta decodificar y verificar el JWT token
             * El token contiene el ID del usuario ( puede contener mas informacion)
             * y se guarda en el objeto req.user
             */
            req.user = jwt.verify(req.headers['authorization'], global.config.secret);
        } catch(err) {
            /*
             * Si el Header authorization es incorrecto, lanza exception
             * Por lo tanto devuelve un codigo 401 con un mensaje de error en JSON
             */
            return res.status(401).json({
                    message: 'Credenciales inválidas.'
            });
        }
    } else {
        /*
         * Si no hay un Header authorization, 
         * devuelve un codigo 401 con mensaje error en JSON
         */
        return res.status(401).jsonp({
                message: 'Credenciales inválidas.'
        });
    }
    next();
    return;
}