const express = require("express");
const { allCommunityController } = require("./../controllers/community.controller");
const communityRouter = express.Router();

communityRouter.post("/list", allCommunityController);

module.exports = communityRouter;
