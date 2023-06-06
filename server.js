const express= require('express')
const app = express()
const challengeRouter = require('./routers/challenge.router')


app.get('./api/challenge', challengeRouter)
app.get('./api/season', seasonRouter)




app.listen(5000,()=>console.log("listening"))

