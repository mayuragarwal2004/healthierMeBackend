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

module.exports = { createChallengeController, listChallengeController };
