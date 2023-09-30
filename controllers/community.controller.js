const { allCommunities } = require("../models/community/community.queries.sql");

const allCommunityController = async (req, res) => {
  const { uID } = req.body;
  if (!uID) {
    return res.status(400).send("Insufficient inputs");
  }
  const communitylist = await allCommunities(uID);
  if (communitylist == -1) {
    return res.status(500).send("Error fetching community list");
  }
  if (!communitylist) {
    return res.status(404).send("Community List not found");
  }

  return res.status(200).send(communitylist);
};

module.exports = { allCommunityController };
