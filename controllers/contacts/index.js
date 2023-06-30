const getAll = require('./getAll');
const getById = require('./getById');
const add = require('./add');
const deleteById = require('./deleteById');
const updateById = require('./updateById');
const updateStatusContact = require('./updateStatusContact');
const { ctrlWrapper } = require('../../helpers')

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateStatusContact: ctrlWrapper(updateStatusContact)
};


