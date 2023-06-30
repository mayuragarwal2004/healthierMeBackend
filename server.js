const express= require('express')
const app = express()
const challengeRouter = require('./routers/challenge.router')
const seasonRouter = require('./routers/season.router')
const connectToMongoose = require('./connection')
const cors = require('cors')

app.use(express.json())
app.use(cors())
connectToMongoose();
app.use('/api/season', seasonRouter)
app.use('/api/challenge', challengeRouter)




app.listen(5001,()=>console.log("listening"))
