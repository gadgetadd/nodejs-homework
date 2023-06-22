const express = require('express')

const ctrl = require('../../controllers/contacts')

const validation = require('../../middlewares/validation')
const { contactJoiSchema } = require('../../models/contacts')

const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getById)

router.post('/', validation(contactJoiSchema), ctrl.add)

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', validation(contactJoiSchema), ctrl.updateById)

module.exports = router
