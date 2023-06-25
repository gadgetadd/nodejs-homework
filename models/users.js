const { Schema, model } = require('mongoose');

const Joi = require("joi")

const { handleMongoError } = require('../middlewares')

const subscriptionList = ["starter", "pro", "business"]

const userJoiSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string().valid(subscriptionList),

})

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

userSchema.post("save", handleMongoError)

const User = model('contact', userSchema)

module.exports = {
    User,
    userJoiSchema,
}