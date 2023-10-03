const con = require("../../connection.sql");
var mysql = require("mysql");

const readEventByEid = async(eId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Events WHERE event_id='${eId}' `,
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

const readEventByCid = async(cId) =>{
  queryResult = await new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM HealthierMe.Events WHERE challenge_id='${cId}' `,
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

const validateEvent = async(eItem) =>{
    if(!eItem.eId || !eItem.eName || !eItem.eDesc || !eItem.eFreq || !eItem.eStart || !eItem.eEnd){
        return false
    }

    if(await readEventByEid(eItem.eId)){
        console.log(err);
        return false;
      }
  
    return true

}

const createCEvent = async(cId, eventArr)=>{
  for (let i  = 0; i<eventArr.length; i++){

    const {eId, eName, eDesc, eFreq, eStart, eEnd} = eventArr[i]

  queryResult = await new Promise((resolve, reject)=>{
    con.query(
      `INSERT INTO HealthierMe.Events
      (event_id, challenge_id, event_name, event_description, start_date, end_date, event_frequency) 
      VALUES 
      ('${eId}', '${cId}', '${eName}', '${eDesc}', '${eStart}', '${eEnd}', '${eFreq}');
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
    

}

module.exports = {createCEvent, validateEvent, readEventByEid, readEventByCid}