const express = require('express')
const {createSeasonController} = require('./../controllers/season.controller')
const seasonRouter = express.Router();

// @route Post /api/season/create
// @desc Insert Whole season obje
// @access Admin only - middleware to be included
seasonRouter.post('/create', createSeasonController)

module.exports = seasonRouter