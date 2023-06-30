const express = require('express')
const {createChallengeController} = require('./../controllers/challenge.controller')
const challengeRouter = express.Router();

challengeRouter.post('/create', createChallengeController)

module.exports = challengeRouter