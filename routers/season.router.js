const express = require('express')
const {createSeasonController, readSeasonController} = require('./../controllers/season.controller')
const seasonRouter = express.Router();

// @route Post /api/season/create
// @desc Insert Whole season object - body : form object
// @access Admin only - middleware to be included
seasonRouter.post('/create', createSeasonController)

// @route Post /api/season/read
// @desc Read Whole season object - body : seasonId
// @access Users registered in the community - middleware to be included
seasonRouter.post('/read', readSeasonController)

module.exports = seasonRouter