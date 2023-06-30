const express = require('express');

const ctrl = require('../../controllers/auth');

const { validateRequest, authMiddleware } = require('../../middlewares');

const { loginUserJoiSchema, registerUserJoiSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validateRequest(registerUserJoiSchema), ctrl.register);

router.post('/login', validateRequest(loginUserJoiSchema), ctrl.login);

router.get("/current", authMiddleware, ctrl.getCurrent);

router.post("/logout", authMiddleware, ctrl.logout);


module.exports = router;
