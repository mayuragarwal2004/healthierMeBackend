const con = require("../../connection.sql");
var mysql = require("mysql");

const readGroupByGid = async(gId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Groups WHERE g_id='${gId}' `,
      function (err, result, fields) {
        if (err) {
          reject(err);
        } else resolve(result);
      }
    );
  }).catch((err) => {
    console.log(err);
    return -1;
  });

  return queryResult[0];
  }

const readGroupByCid = async(cId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Groups WHERE challenge_id='${cId}' `,
      function (err, result, fields) {
        if (err) {
          reject(err);
        } else resolve(result);
      }
    );
  }).catch((err) => {
    console.log(err);
    return -1;
  });

  return queryResult[0];
  }

const validateGroup = async (gItem) => {
  if (
    !gItem.gId ||
    !gItem.gName ||
    !gItem.numOpts ||
    !gItem.minToComp ||
    gItem.minToComp > gItem.numOpts
  ) {
    return false;
  }

  if (
    await readGroupByGid(gItem.gId)
  ) {
    return false;
  }
  return true;
};

const createCGroup = async (cId, groupArr) => {
  for (let i  = 0; i<groupArr.length; i++){

    const {gId, gName, numOpts, minToComp,} = groupArr[i]

  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `INSERT INTO HealthierMe.Groups
      (g_id, challenge_id, g_name, num_opts, min_to_comp, last_updated ) 
      VALUES 
      ('${gId}', '${cId}', '${gName}', '${numOpts}', '${minToComp}',  '${(new Date).toISOString().slice(0, 19).replace('T', ' ')}' );
       `,
      function (err, result, fields) {
        if (err) {
          reject(err) 
          }
        else resolve(result);
      }
    )
  }).catch((err)=>{
    console.log(err)
    return -1;
  }
    )
  }
  
  return true
};

module.exports = { createCGroup, validateGroup, readGroupByCid, readGroupByGid };
