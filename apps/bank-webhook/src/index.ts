import express from 'express'

const app = express()

app.listen(3002, ()=> {
    console.log("app listening on port 3002")
})
