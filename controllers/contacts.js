const { Contact } = require('../models/contacts')


const getAll = async (req, res, next) => {
    try {
        const result = await Contact.find();
        res.json(result);
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findById(contactId);
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
        const result = await Contact.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
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

        const { contactId } = req.params;
        const result = await Contact.findByIdAndUpdate(contactId, req.body);
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


