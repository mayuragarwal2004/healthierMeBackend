const con = require("../../connection.sql");
var mysql = require("mysql");

const allCommunities = async (uID) => {
  if (!uID) {
    return 0;
  }

  try {
    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT C.community_id, C.community_name
          FROM HealthierMe.Community AS C
          INNER JOIN HealthierMe.CommunityUserMapping AS CU
          ON C.community_id = CU.community_id
          WHERE CU.user_id = '${uID}';`,
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

module.exports = { allCommunities };