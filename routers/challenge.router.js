const express = require('express')
const {createChallengeController, listChallengeController} = require('./../controllers/challenge.controller')
const challengeRouter = express.Router();

challengeRouter.post('/create', createChallengeController)

challengeRouter.post('/list', listChallengeController)

module.exports = challengeRouter