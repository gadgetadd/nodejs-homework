const contacts = require('../models/contacts')
const Joi = require("joi")

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required(),
})

const getAll = async (req, res, next) => {
    try {
        const result = await contacts.listContacts();
        res.json(result);
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.getById(contactId);
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
}

const add = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contacts.removeContact(contactId);
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json({
            message: "contact deleted"
        })
    } catch (error) {
        next(error)
    }
}

const updateById = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body);
        if (!result) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.json(result);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deleteById,
}


