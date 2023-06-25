const { Schema, model } = require('mongoose');

const Joi = require("joi")

const contactJoiSchema = Joi.object({
  name: Joi.string().required().error(new Error('missing required name field')),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean()
})

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required().error(new Error('missing field favorite')),
})

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  }
}, {
  versionKey: false
});

contactSchema.post("save", (err, _, next) => {
  err.status = '400';
  next();
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  contactJoiSchema,
  favoriteJoiSchema
}