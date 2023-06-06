const express = require('express')
const challengeRouter = express.Router();

challengeRouter.get('./create', challenge.controller)

module.exports = challengeRouter