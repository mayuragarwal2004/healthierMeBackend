const Season = require("./season.model");

const readSeason = async(sId) =>{
  let seasonObj = await Season.findOne({"sId" : sId}).catch((err) => {
    console.log(err);
    return -1;
  })
  // console.log(seasonObj)
  if(seasonObj != null){
    return seasonObj.toObject()
  }
  
  return seasonObj
}

const validateSeason = async(seasonObj) =>{
    if(!seasonObj.sId || !seasonObj.sName || !seasonObj.sStart || !seasonObj.sEnd || !seasonObj.challengeNo){
      return false
    }        

    if (await Season.findOne({"sId" : seasonObj.sId}).catch((err) => {
      console.log(err);
      return -1;
    }))
    {  
      return false
    }

    return true
}

const createSeason = async (sObj) => {
  const createSeasonMain = await Season.create(sObj).catch((err) => {
    console.log(err);
    return -1;
  });

  return createSeasonMain;
};

const allSeasons = async(uID, sId) =>{

  if (!uID || !sID) {
    return 0;
  }

  try {
    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT (*) FROM user WHERE SELECT C.community_id, C.community_name
        FROM HealthierMe.Community AS C
        INNER JOIN HealthierMe.CommunityUserMapping AS CU
        ON C.community_id = CU.community_id
        WHERE CU.user_id = '${uID}';`,
        (err, result, fields) => {
          if (err) {
            reject(err);
            return;
          }
          
          const userExists = result[0]["count(*)"] > 0;
          resolve(userExists ? 1 : 2);
        }
      );
    });

    return queryResult;
  } catch (err) {
    console.log(err);
    return -2;
  }



  let seasonObj = await Season.findOne({"sId" : sId}).catch((err) => {
    console.log(err);
    return -1;
  })
  // console.log(seasonObj)
  if(seasonObj != null){
    return seasonObj.toObject()
  }
  
  return seasonObj
}

module.exports = { createSeason, validateSeason, readSeason };
