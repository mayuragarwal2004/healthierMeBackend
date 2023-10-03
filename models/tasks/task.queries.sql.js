const con = require("../../connection.sql");
var mysql = require("mysql");

const readTaskByTid = async(tId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Tasks WHERE task_id='${tId}' `,
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

const readTaskByCid = async(cId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Tasks WHERE challenge_id='${cId}' `,
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

const validateTask = async(tItem) =>{
    if(!tItem.tId || !tItem.tName || !tItem.tDesc || !tItem.tQuant || !tItem.tUnit || !tItem.tPeriod || !tItem.tPeriodUnit || !tItem.tTC || !tItem.tStart || !tItem.tEnd){
        return false
    }

    if(await readTaskByTid(tItem.tId))
  {
        return false
    }
    return true

}

const createCTask = async (cId, taskArr) => {

  for (let i  = 0; i<taskArr.length; i++){

    const {tId, tName, tDesc, tQuant, tUnit, tPeriod, tPeriodUnit, tTC, tStart, tEnd} = taskArr[i]

  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `INSERT INTO HealthierMe.Tasks
      (task_id, challenge_id, task_name, task_description, task_quantity, task_unit, task_period, task_period_unit, times_to_complete, start_date, end_date) 
      VALUES 
      ('${tId}', '${cId}', '${tName}', '${tDesc}', '${tQuant}', '${tUnit}', '${tPeriod}', '${tPeriodUnit}', '${tTC}', '${tStart}', '${tEnd}', );
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

module.exports = { createCTask, validateTask, readTaskByTid, readTaskByCid };
