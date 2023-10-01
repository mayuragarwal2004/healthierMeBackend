const Season = require("./season.model");
const con = require("../../connection.sql");
var mysql = require("mysql");
const { verifyUserCommunity } = require("../community/community.queries.sql");

const readSeason = async (sId) => {
  let seasonObj = await Season.findOne({ sId: sId }).catch((err) => {
    console.log(err);
    return -1;
  });
  // console.log(seasonObj)
  if (seasonObj != null) {
    return seasonObj.toObject();
  }

  return seasonObj;
};

const validateSeason = async (seasonObj) => {
  if (
    !seasonObj.sId ||
    !seasonObj.sName ||
    !seasonObj.sStart ||
    !seasonObj.sEnd ||
    !seasonObj.challengeNo
  ) {
    return false;
  }

  if (
    await Season.findOne({ sId: seasonObj.sId }).catch((err) => {
      console.log(err);
      return -1;
    })
  ) {
    return false;
  }

  return true;
};

const createSeason = async (sObj) => {
  const createSeasonMain = await Season.create(sObj).catch((err) => {
    console.log(err);
    return -1;
  });

  return createSeasonMain;
};

const listSeasons = async (uID, communityId) => {
  if (!uID || !communityId) {
    return 0;
  }

  try {
    if (!(await verifyUserCommunity(uID, communityId))) {
      return -2;
    }

    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT S.season_id, S.name, S.description, S.start_date, S.end_date, S.active, S.last_updated
        FROM HealthierMe.Seasons AS S
        JOIN HealthierMe.CommunitySeasonMapping AS CSM ON S.season_id = CSM.season_id
        JOIN HealthierMe.Community AS C ON CSM.community_id = C.community_id
        WHERE C.community_id = '${communityId}';`,
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

module.exports = { createSeason, validateSeason, readSeason, listSeasons };
