const {createCTask, validateTask} = require('../models/tasks/task.queries')
const {createCEvent, validateEvent} = require('../models/events/event.queries')
const {createCGroup, validateGroup} = require('../models/groups/group.queries')
const { validateChallenge, createChallenge } = require('../models/challenges/challenge.queries')
const { validateSeason, createSeason } = require('../models/seasons/season.queries')

const createSeasonController = async (req,res)=>{
    let challengeIds = [] //for adding into seasons object
    const challengeArr = req.body.challenge
    const seasonObj = req.body.season
    // console.log(challengeArr)

    if(!seasonObj || !await validateSeason(seasonObj)){
        return res.status(400).send("Insufficient inputs")
    }

    if(!challengeArr){
        return res.status(400).send("Insufficient inputs")
    }

    //checking whole challenge array
    for(i in challengeArr){
        let {cId, cName, cDesc, cStart, cEnd} = challengeArr[i]
        let cObj = {cId, cName, cDesc, cStart, cEnd}
        let taskArr = challengeArr[i].task
        let eventArr = challengeArr[i].event
        let groupArr = challengeArr[i].group


        if(!await validateChallenge(cObj)){
            return res.status(400).send(`Challenge ${i+1} Invalid`)
        }
        challengeIds.push(cId)

        // --------------- Task Validation -----------------------

        for(j in taskArr){
            let tItem = taskArr[j]
            // console.log(tItem)
            if(!await validateTask(tItem)){
                return res.status(400).send("Task Items Invalid / Not unique")
            }
        }

         // --------------- Event Validation -----------------------
        for(j in eventArr){
            let eItem = eventArr[j]
            // console.log(eItem)
            if(!await validateEvent(eItem)){
                return res.status(400).send("Event Items Invalid / Not unique")
            }
            
        }

         // --------------- Group Validation ---------------------
        for(j in groupArr){
            let gItem = groupArr[j]
            // console.log(gItem)
            if(!await validateGroup(gItem)){
                return res.status(400).send("Group Items Invalid / Not unique")
            }
            
        }

    }

    //enter data into mongo
    for(i in challengeArr){
        let {cId, cName, cDesc, cStart, cEnd} = challengeArr[i]
        let cObj = {cId, cName, cDesc, cStart, cEnd}
        let taskArr = challengeArr[i].task
        let eventArr = challengeArr[i].event
        let groupArr = challengeArr[i].group
        let sObj = {...seasonObj, challengeIds}

        if (await createSeason(sObj) == -1){
            return res.status(400).send("Error creating Season")
        }

        if (await createChallenge(cObj) == -1){
            return res.status(400).send("Error creating Challenge")
        }

        if (await createCTask(cId, taskArr) == -1){
            return res.status(400).send("Error creating task")
        }

        if (await createCEvent(cId, eventArr) == -1){
            return res.status(400).send("Error creating Event")
        }

        if (await createCGroup(cId, groupArr) == -1){
            return res.status(400).send("Error creating Group")
        }


    }
    return res.status(200).send("Form submitted successfully")
}

module.exports = {createSeasonController}