const {createCTask, validateTask, readTask} = require('../models/tasks/task.queries')
const {createCEvent, validateEvent, readEvent} = require('../models/events/event.queries')
const {createCGroup, validateGroup, readGroup} = require('../models/groups/group.queries')
const { validateChallenge, createChallenge, readChallenge } = require('../models/challenges/challenge.queries')
const { validateSeason, createSeason, readSeason } = require('../models/seasons/season.queries')


const readSeasonController = async(req, res)=>{
    //get season object
    let seasonObj = await readSeason(req.body.sId)
    
    if(seasonObj == -1){
        return res.status(400).send("Error getting season data")
    }
    if(!seasonObj){
        return res.status(404).send("Season data not found")
    }

    seasonObj.challenge = []

    //iterate over challenge ids  
   let {challengeIds} = seasonObj
    for(i in challengeIds){
        let challengeObj = await readChallenge(challengeIds[i])
        if(challengeObj == -1){
            return res.status(400).send("Error getting challenges")
        }
        if(!challengeObj){
            return res.status(404).send("Challenge data not found")
        }
        // challengeObj = challengeObj.toObject()
        

        let {cId} = challengeObj

        //for every challenge id, get tasks, events, groups
        let groupArr = await readGroup(cId)
        if(groupArr == -1){
            return res.status(400).send("Error getting Groups")
        }
        let eventArr = await readEvent(cId)
        if(eventArr == -1){
            return res.status(400).send("Error getting Events")
        }
        let taskArr = await readTask(cId)
        if(taskArr == -1){
            return res.status(400).send("Error getting Tasks")
        }

       challengeObj.group = [...groupArr]
       challengeObj.event = [...eventArr]
       challengeObj.task = [...taskArr]

        // append challenge object in season object
        seasonObj.challenge.push(challengeObj)

    }

    return res.status(200).send(seasonObj)

}

const createSeasonController = async (req,res)=>{
    let challengeIds = [] //for adding into seasons object
    const challengeArr = req.body.challenge
    const seasonObj = req.body.season
    // console.log(challengeArr)

    if(!seasonObj || !await validateSeason(seasonObj)){
        return res.status(400).send("Insufficient/ Wrong inputs")
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

module.exports = {createSeasonController, readSeasonController}