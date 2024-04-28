const express = require('express')
import { Request,Response } from "express"
const mysql = require('mysql')
const cors = require('cors')
import { TableTypes } from "./types"
import { Precipitation_2004_2011 } from "./types"
const app = express()
app.use(cors())
require('dotenv').config();

app.get('/',(req:Request,res:Response)=>{
    return res.json("From Backend side")
})

const db = mysql.createConnection({
    host:process.env.DB_URL,
    user:process.env.DB_User,
    password:process.env.DB_password,
    database:process.env.DB_database,
})

app.get('/state',(req:Request,res:Response)=>{
    const sql = "SELECT DISTINCT State,stateid FROM practice.WetDayFrequency ORDER BY stateid ASC;"
    db.query(sql,(err:Error|null,data:TableTypes[]) => {
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.listen(8001,()=>{
    console.log("listening")
})

module.exports = app;
module.exports = db;