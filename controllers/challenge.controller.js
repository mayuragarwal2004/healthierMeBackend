const { listChallenges } = require("../models/challenges/challenge.queries.sql");

const createChallengeController = (req, res) => {
  console.log(req.body);
  res.send(req.body);
};

const listChallengeController = async (req, res) => {
  const { uID, communityId, seasonId } = req.body;

  if (!uID || !communityId || !seasonId) {
    return res.status(400).send("Insufficient inputs");
  }
  const challengelist = await listChallenges(uID, communityId, seasonId);
  if (challengelist == -1) {
    return res.status(500).send("Error fetching challenge list");
  } else if (challengelist == -2) {
    return res.status(403).send("No permission to view the data");
  }
  if (!challengelist) {
    return res.status(404).send("Challenge List not found");
  }

  return res.status(200).send(challengelist);
};

const listTasksEventsGroupsController = async (req, res) => {
  const { uID, communityId, seasonId } = req.body;

  if (!uID || !communityId || !seasonId) {
    return res.status(400).send("Insufficient inputs");
  }

  // 1. Get all tasks
  // 2. Get all events
  // 3. Get all groups
  // 4. Arrange all if needed

  const challengelist = await listChallenges(uID, communityId, seasonId);
  if (challengelist == -1) {
    return res.status(500).send("Error fetching challenge list");
  } else if (challengelist == -2) {
    return res.status(403).send("No permission to view the data");
  }
  if (!challengelist) {
    return res.status(404).send("Challenge List not found");
  }

  return res.status(200).send(challengelist);
};

function printhelloworld(){

  
}

module.exports = { createChallengeController, listChallengeController, listTasksEventsGroupsController };
