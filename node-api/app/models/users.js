const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = Schema({    
    name: String,
    lastname: {type: String},
    username: {type: String},
    email: {type: String, unique: true},
    password: String,
    created_at: {
        type: Date,
    },    
    updated_at: {
        type: Date, 
        default: Date.now,
    },

})
User = mongoose.model('users', UserSchema);  

module.exports = User
