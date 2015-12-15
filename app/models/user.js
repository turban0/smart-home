var mongoose = require('mongoose');
var Promise = require('bluebird');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
        email        : String,
        password     : String,
        name         : String
    });

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); // TODO: use async
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password); // TODO: use async
};

var User = mongoose.model('User', userSchema);
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);

module.exports = User;