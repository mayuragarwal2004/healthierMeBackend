const Group = require("./group.model");

const readGroup = async(cId) =>{
  let groupCObj = await Group.findOne({ "cId": cId }).catch((err) => {
    console.log(err);
    return -1;
  })

  return groupCObj.group
}


const validateGroup = async (gItem) => {
  if (
    !gItem.gId ||
    !gItem.numOpts ||
    !gItem.minToComp ||
    gItem.minToComp > gItem.numOpts
  ) {
    return false;
  }

  if (
    await Group.findOne({ "group.gId": gItem.gId }).catch((err) => {
      console.log(err);
      return false;
    })
  ) {
    return false;
  }
  return true;
};

const createCGroup = async (cId, groupArr) => {
  const createCGroupMain = await Group.create({
    cId: cId,
    group: groupArr,
  }).catch((err) => {
    console.log(err);
    return -1;
  });

  return createCGroupMain;
};

const listGroups = async (uID, communityId, challengeId) => {
  if (!uID || !communityId || !challengeId) {
    return 0;
  }

  try {
    if (!(await verifyUserCommunity(uID, communityId))) {
      return -2;
    }

    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT G.g_id, G.num_opts, G.min_to_comp, G.activity
        FROM HealthierMe.Groups AS G
        WHERE G.challenge_id = '${challengeId}';`,
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

module.exports = { createCGroup, validateGroup, readGroup, listGroups };
