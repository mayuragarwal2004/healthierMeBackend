const express = require('express')
const {userCreateController, userReadController} = require('./../controllers/user.controller')
const userRouter = express.Router();

// @route Post /api/user/create
// @desc Create user
// @access Everyone
userRouter.post('/create', userCreateController)

// @route Post /api/user/read
// @desc Read user
// @access 
userRouter.post('/read', userReadController)

module.exports = userRouter