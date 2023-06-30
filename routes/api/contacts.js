const express = require('express');
const asyncHandler = require('express-async-handler')

const ctrl = require('../../controllers/contacts');

const { validateRequest, validateMongoId, authMiddleware } = require('../../middlewares');

const { contactJoiSchema, favoriteJoiSchema } = require('../../models/contact');

const router = express.Router();
;
router.get('/', authMiddleware, asyncHandler(ctrl.getAll));

router.get('/:contactId', authMiddleware, validateMongoId, asyncHandler(ctrl.getById));

router.post('/', authMiddleware, validateRequest(contactJoiSchema), asyncHandler(ctrl.add));

router.delete('/:contactId', authMiddleware, validateMongoId, asyncHandler(ctrl.deleteById));

router.put('/:contactId', authMiddleware, validateMongoId, validateRequest(contactJoiSchema), asyncHandler(ctrl.updateById));

router.patch('/:contactId/favorite', authMiddleware, validateMongoId, validateRequest(favoriteJoiSchema), asyncHandler(ctrl.updateStatusContact));

module.exports = router;
