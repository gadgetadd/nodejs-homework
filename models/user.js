const { Schema, model } = require('mongoose');

const Joi = require("joi");

// const {handleMongoError, hashPassword, comparePassword, signToken } = require('../middlewares');

const handleMongoError = require('../middlewares/handleMongoError');
const hashPassword = require('../middlewares/hashPassword');
const comparePassword = require('../middlewares/comparePassword');
const signToken = require('../middlewares/signToken');

const subscriptionList = ["starter", "pro", "business"];

const registerUserJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid(...subscriptionList),
});

const loginUserJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscriptionList,
        default: "starter"
    },
    token: String
}, {
    versionKey: false
});

userSchema.pre('save', hashPassword);

userSchema.post("save", handleMongoError);

userSchema.methods.comparePassword = comparePassword;

userSchema.methods.signToken = signToken;

const User = model('user', userSchema);

module.exports = {
    User,
    registerUserJoiSchema,
    loginUserJoiSchema
};