const express = require('express')
const {createSeasonController, readSeasonController, listSeasonController} = require('./../controllers/season.controller')
const seasonRouter = express.Router();

// @route Post /api/season/create
// @desc Insert Whole season object - body : form object
// @access Admin only - middleware to be included
seasonRouter.post('/create', createSeasonController)

// @route Post /api/season/read
// @desc Read Whole season object - body : seasonId
// @access Users registered in the community - middleware to be included
seasonRouter.post('/read', readSeasonController)

// @route Post /api/season/list
// @desc List all seasons of a given community ID - body : uID, communityId
// @access Users registered in the community - middleware to be included
seasonRouter.post('/list', listSeasonController)

module.exports = seasonRouter