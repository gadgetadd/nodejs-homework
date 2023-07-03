const express = require('express');
const asyncHandler = require('express-async-handler')
const ctrl = require('../../controllers/auth');

const { validateRequest, authMiddleware, upload } = require('../../middlewares');

const { loginUserJoiSchema, registerUserJoiSchema, subscriptionJoiSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validateRequest(registerUserJoiSchema), asyncHandler(ctrl.register));

router.post('/login', validateRequest(loginUserJoiSchema), asyncHandler(ctrl.login));

router.get("/current", authMiddleware, asyncHandler(ctrl.getCurrent));

router.post("/logout", authMiddleware, asyncHandler(ctrl.logout));

router.patch('/', authMiddleware, validateRequest(subscriptionJoiSchema), asyncHandler(ctrl.updateSubscription));

router.patch("/avatars", authMiddleware, upload.single("avatar"), asyncHandler(ctrl.updateAvatar));



module.exports = router;
