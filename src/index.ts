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


app.get('/distict', (req:Request,res:Response) => {
    const stateid = req.query.Stateid; // Extract stateid from query parameters
    const sql = `SELECT DISTINCT Distict,districtid FROM practice.WetDayFrequency WHERE stateid = ${stateid} order by districtid;`;
    db.query(sql, stateid, (err:Error|null,data:TableTypes[]) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/year', (req:Request,res:Response) => {
    const tablename = req.query.tablename; // Extract stateid from query parameters
    const sql = `SELECT DISTINCT year_val FROM ${tablename} order by year_val`;
    if(tablename=="Precipitation_2004_2011"){
        db.query(sql, tablename, (err:Error|null, data:Precipitation_2004_2011[]) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }else{
        db.query(sql, tablename, (err:Error|null, data:TableTypes[]) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }
});

app.get('/yearAfter', (req:Request,res:Response) => {
    const tablename = req.query.tablename; // Extract stateid from query parameters
    const selectedFromYear = req.query.selectedFromYear;
    const sql =`SELECT DISTINCT year_val FROM ${tablename} WHERE year_val >= ${selectedFromYear} ORDER BY year_val`;

   if(tablename=="Precipitation_2004_2011"){
        db.query(sql, tablename, (err:Error|null, data:Precipitation_2004_2011[]) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }else{
        db.query(sql, tablename, (err:Error|null, data:TableTypes[]) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }
});

app.get('/final', (req:Request,res:Response) => {
    const tablename = req.query.tablename; // Extract stateid from query parameters
    const selectedFromYear = req.query.selectedFromYear;
    const selectedToYear = req.query.selectedToYear;
    const districtid = req.query.districtid;
    const stateid = req.query.stateid;
    const sql =`SELECT * 
    FROM ${tablename} 
    WHERE year_val BETWEEN ${selectedFromYear} AND ${selectedToYear} 
    AND stateid = ${stateid}
    AND districtid = ${districtid}`;

   if(tablename=="Precipitation_2004_2011"){
        db.query(sql, tablename, (err:Error|null, data:Precipitation_2004_2011[]) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }else{
        db.query(sql, tablename, (err:Error|null, data:TableTypes[]) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    }
});

app.get('/final2', (req:Request,res:Response) => {
    const tablename = req.query.tablename; // Extract stateid from query parameters
    const selectedFromYear = req.query.selectedFromYear;
    const selectedToYear = req.query.selectedToYear;
    const district = req.query.District;
    const state = req.query.State;
    const sql =`SELECT * 
    FROM ${tablename} 
    WHERE year_val BETWEEN ${selectedFromYear} AND ${selectedToYear} 
    AND State = ${state}
    AND District = ${district}`;

        db.query(sql, tablename, (err:Error|null, data:Precipitation_2004_2011[]) => {
            if (err) return res.json(err);
            return res.json(data);

    })
});



app.listen(8001,()=>{
    console.log("listening")
})

module.exports = app;
module.exports = db;