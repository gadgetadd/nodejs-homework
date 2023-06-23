const express = require('express')

const ctrl = require('../../controllers/contacts')

const { validateRequest, validateMongoId } = require('../../middlewares')
const { contactJoiSchema, favoriteJoiSchema } = require('../../models/contacts')

const router = express.Router()

router.get('/', ctrl.getAll)

router.get('/:contactId', validateMongoId, ctrl.getById)

router.post('/', validateRequest(contactJoiSchema), ctrl.add)

router.delete('/:contactId', validateMongoId, ctrl.deleteById)

router.put('/:contactId', validateMongoId, validateRequest(contactJoiSchema), ctrl.updateById)

router.patch('/:contactId/favorite', validateMongoId, validateRequest(favoriteJoiSchema), ctrl.updateById)

module.exports = router
