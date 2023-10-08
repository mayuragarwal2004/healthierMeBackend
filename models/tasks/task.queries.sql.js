const Task = require("./task.model");

const readTask = async(cId) =>{
  let taskCObj = await Task.findOne({ "cId": cId }).catch((err) => {
    console.log(err);
    return -1;
  })

  return taskCObj.task
}

const validateTask = async(tItem) =>{
    if(!tItem.tId || !tItem.tName || !tItem.tDesc || !tItem.tQuant || !tItem.tUnit || !tItem.tPeriodUnit || !tItem.tTC || !tItem.tStart || !tItem.tEnd){
        return false
    }

    if(await Task.findOne({"task.tId": tItem.tId }).catch((err) => {
      console.log(err);
      return false;
    })
  ){
        return false
    }
    return true

}

const createCTask = async (cId, taskArr) => {

  const createCTaskMain = await Task.create({
    cId: cId,
    task: taskArr,
  }).catch((err) => {
    console.log(err);
    return -1;
  });

  return createCTaskMain;

};

const listTasks = async (uID, communityId, challengeId) => {
  if (!uID || !communityId || !challengeId) {
    return 0;
  }

  try {
    if (!(await verifyUserCommunity(uID, communityId))) {
      return -2;
    }

    const queryResult = await new Promise((resolve, reject) => {
      con.query(
        `SELECT T.task_id, T.task_name, T.task_description, T.task_quantity, T.task_unit, T.task_period, T.task_period_unit, T.task_number, T.times_to_complete, T.start_date, T.end_date
        FROM HealthierMe.Tasks AS T
        WHERE T.challenge_id = '${challengeId}';`,
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

module.exports = { createCTask, validateTask, readTask, listTasks };
