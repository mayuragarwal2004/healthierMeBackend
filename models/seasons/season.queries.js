const Season = require("./season.model");

const validateSeason = async(seasonObj) =>{
    if(!seasonObj.sId || !seasonObj.sName || !seasonObj.sStart || !seasonObj.sEnd || !seasonObj.challengeNo){
        return false
    }        
    if (await Season.findOne({"sId" : seasonObj.sId}).catch((err) => {
        console.log(err);
        return false;
      }) )
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

module.exports = { createSeason, validateSeason };
