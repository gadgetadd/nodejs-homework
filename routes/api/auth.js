const express = require('express');
const asyncHandler = require('express-async-handler')
const ctrl = require('../../controllers/auth');

const { validateRequest, authMiddleware } = require('../../middlewares');

const { loginUserJoiSchema, registerUserJoiSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validateRequest(registerUserJoiSchema), asyncHandler(ctrl.register));

router.post('/login', validateRequest(loginUserJoiSchema), asyncHandler(ctrl.login));

router.get("/current", authMiddleware, asyncHandler(ctrl.getCurrent));

router.post("/logout", authMiddleware, asyncHandler(ctrl.logout));


module.exports = router;
