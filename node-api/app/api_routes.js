
module.exports = (app) => {

    // ********** DECLARACION DE VARIABLES DE RUTAS **********

    // rutas de inicio de sesion y registro
    const auth = require('./routes/api/auth');
    const authMiddleware = require('./middlewares/api/auth.js');
    // ************************************************************

    
    /// ********** rutas API sin SESION **********
    
    // API usa ruta de inicio de sesion sin autenticar
    app.use('/api/v1', auth);
    
    // ****************************************
    
    
    
    /// ********** rutas API con SESION TOKEN **********
    
    // middleware que verifica token de autenticacion
    app.use('/api/v1', authMiddleware);
    
    // recursos del usuario
    const user = require('./routes/api/user');

    // Recursos de User
    app.use('/api/v1', user);
    
    // ****************************************
    
}