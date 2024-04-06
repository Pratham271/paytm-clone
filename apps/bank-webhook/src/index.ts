import express from 'express'
import db from '@repo/db/client'

const app = express()

app.listen(3002, ()=> {
    console.log("app listening on port 3002")
})
