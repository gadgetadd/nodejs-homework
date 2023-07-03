const { Schema, model } = require('mongoose');

const Joi = require("joi");

const { handleMongoError, signToken, comparePassword, hashPassword } = require("../helpers");

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

const subscriptionJoiSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required().messages({
        'any.required': 'missing field subscription'
    })
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
    avatarURL: String,
    token: String
}, {
    versionKey: false
});

userSchema.methods.comparePassword = comparePassword;

userSchema.methods.signToken = signToken;

userSchema.pre('save', hashPassword);

userSchema.post("save", handleMongoError);

const User = model('user', userSchema);

module.exports = {
    User,
    registerUserJoiSchema,
    loginUserJoiSchema,
    subscriptionJoiSchema
};