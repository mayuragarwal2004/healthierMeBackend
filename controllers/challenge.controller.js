const createChallengeController = (req,res)=>{
    console.log(req.body)
    res.send(req.body)
}

module.exports = {createChallengeController}