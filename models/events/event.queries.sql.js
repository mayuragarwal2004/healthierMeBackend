const Event = require("./event.model");

const readEvent = async (cId) => {
  let eventCObj = await Event.findOne({ cId: cId }).catch((err) => {
    console.log(err);
    return -1;
  });

  return eventCObj.event;
};

const validateEvent = async (eItem) => {
  if (
    !eItem.eId ||
    !eItem.eName ||
    !eItem.eDesc ||
    !eItem.eFreq ||
    !eItem.eStart ||
    !eItem.eEnd
  ) {
    return false;
  }

  if (
    await Event.findOne({ "event.eId": eItem.eId }).catch((err) => {
      console.log(err);
      return false;
    })
  ) {
    return false;
  }
  return true;
};

const createCEvent = async (cId, eventArr) => {
  const createCEventMain = await Event.create({
    cId: cId,
    event: eventArr,
  }).catch((err) => {
    console.log(err);
    return -1;
  });

  return createCEventMain;
};

const listEvents = async (uID, communityId, challengeId) => {
  if (!uID || !communityId || !challengeId) {
    return 0;
  }

  try {
    if (!(await verifyUserCommunity(uID, communityId))) {
      return -2;
    }

    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT E.event_id, E.event_name, E.event_description, E.start_date, E.end_date, E.event_frequency
        FROM HealthierMe.Events AS E
        WHERE E.challenge_id = '${challengeId}';`,
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

module.exports = { createCEvent, validateEvent, readEvent, listEvents };
