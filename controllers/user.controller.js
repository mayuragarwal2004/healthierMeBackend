const { createUser, validateUser, readUser } = require("../models/users/user.queries")

const userReadController = async(req, res) =>{
    let {uId} = req.body
    if (!uId){
        return res.status(400).send("Insufficient inputs")
    }
    userObj = await readUser(uId)
    if(userObj == -1){
        return res.status(500).send("Error fetching user")
    }
    if(!userObj){
        return res.status(404).send("User not found")
    }
    return res.status(200).send(userObj)
    
}

const userCreateController = async(req, res) =>{
    let uItem = req.body
    // console.log(uItem)
    let vU = await validateUser(uItem)
    if (!uItem || vU == 0){
        return res.status(400).send("Insufficient inputs")
    }
    switch (vU){
        case -1 :  return res.status(500).send("Error validating User");
        case -2 :  return res.status(409).send("User already Exists");
    }
    let uObj = await createUser(uItem)
    if (uObj == -1){
        return res.status(500).send("Error creating User");
    }
    return res.status(200).send("User created successfully");
    
}

const userExistController = async(req, res) =>{
    let uItem = req.body
    console.log(req.body)
    return res.status(200).send(true);
    
}

module.exports = {userCreateController, userReadController, userExistController}