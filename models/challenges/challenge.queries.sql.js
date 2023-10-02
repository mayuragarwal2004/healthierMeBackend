const con = require("../../connection.sql");
var mysql = require("mysql");
const { verifyUserCommunity } = require("../community/community.queries.sql");

const Challenge = require("./challenge.model");
const Event = require("../events/event.model");
const Task = require("../tasks/task.model");
const Group = require("../groups/group.model");

const readChallenge = async (cId) => {
  const challengeObj = await Challenge.findOne({ cId: cId }).catch((err) => {
    console.log(err);
    return -1;
  });

  if (challengeObj != null) {
    return challengeObj.toObject();
  }

  return challengeObj;
};

const validateChallenge = async (cObj) => {
  if (!cObj.cId || !cObj.cName || !cObj.cDesc || !cObj.cStart || !cObj.cEnd) {
    return false;
  }
  try {
    if (
      (await Challenge.findOne({ cId: cObj.cId })) ||
      (await Task.findOne({ cId: cObj.cId })) ||
      (await Event.findOne({ cId: cObj.cId })) ||
      (await Group.findOne({ cId: cObj.cId }))
    ) {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};

const createChallenge = async (cObj) => {
  const createChallengeMain = await Challenge.create(cObj).catch((err) => {
    console.log(err);
    return -1;
  });

  return createChallengeMain;
};

const listChallenges = async (uID, communityId, seasonId) => {
  if (!uID || !communityId) {
    return 0;
  }

  try {
    if (!(await verifyUserCommunity(uID, communityId))) {
      return -2;
    }

    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT C.challenge_id, C.challenge_name, C.description, C.start_date, C.end_date, C.active, C.last_updated
        FROM HealthierMe.Challenges AS C
        WHERE C.season_id = '${seasonId}';`,
        (err, result, fields) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        }
      );
    });

    return queryResult;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

module.exports = {
  validateChallenge,
  createChallenge,
  readChallenge,
  listChallenges,
};
