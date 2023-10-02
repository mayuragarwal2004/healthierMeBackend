const express = require("express");
const { allCommunityController } = require("./../controllers/community.controller");
const communityRouter = express.Router();

// @route Post /api/community/list
// @desc List all communities of a given user ID - body : uID
// @access Users registered in the community - middleware to be included
communityRouter.post("/list", allCommunityController);

module.exports = communityRouter;
