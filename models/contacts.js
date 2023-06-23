const { Schema, model } = require('mongoose');

const Joi = require("joi")

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/),
  favorite: Joi.boolean()
})

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean().required()
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
  versionKey: false, timestamps: true
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