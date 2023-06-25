const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateRequest, validateMongoId, authMiddleware } = require('../../middlewares');

const { contactJoiSchema, favoriteJoiSchema } = require('../../models/contact');

const router = express.Router();
;
router.get('/', authMiddleware, ctrl.getAll);

router.get('/:contactId', authMiddleware, validateMongoId, ctrl.getById);

router.post('/', authMiddleware, validateRequest(contactJoiSchema), ctrl.add);

router.delete('/:contactId', authMiddleware, validateMongoId, ctrl.deleteById);

router.put('/:contactId', authMiddleware, validateMongoId, validateRequest(contactJoiSchema), ctrl.updateById);

router.patch('/:contactId/favorite', authMiddleware, validateMongoId, validateRequest(favoriteJoiSchema), ctrl.updateStatusContact);

module.exports = router;
