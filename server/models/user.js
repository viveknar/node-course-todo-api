const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.generateAuthToken = function (callback) {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({id: user._id, access: access}, '123abc').toString();

    user.tokens.push({access: access, token: token});

    user.save(function(err) {
        if (err) {
            return callback(err);
        }

        else {
            return callback(undefined, token);
        }
    });
};

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

var User = mongoose.model('User', UserSchema);

module.exports.User = User;