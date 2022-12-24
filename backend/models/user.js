const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true  
    },        
    lastName: {
        type: String,
        required: true,
        trimp: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail],
        trimp: true
    },
    password: {
        type: String,
        required: true,
        minLength : 8
    },
    picture: {
        type: String
    },
    role: {
        type: String,
        default: "USER"
    }
},
);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
