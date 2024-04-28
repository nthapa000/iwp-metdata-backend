"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();
app.get('/', (req, res) => {
    return res.json("From Backend side");
});
const PORT = process.env.port || 8001;
const db = mysql.createConnection({
    host: process.env.DB_URL,
    user: process.env.DB_User,
    password: process.env.DB_password,
    database: process.env.DB_database,
});
app.get('/state', (req, res) => {
    const sql = "SELECT DISTINCT State,stateid FROM practice.WetDayFrequency ORDER BY stateid ASC;";
    db.query(sql, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
app.get('/distict', (req, res) => {
    const stateid = req.query.Stateid; // Extract stateid from query parameters
    const sql = `SELECT DISTINCT Distict,districtid FROM practice.WetDayFrequency WHERE stateid = ${stateid} order by districtid;`;
    db.query(sql, stateid, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
app.get('/year', (req, res) => {
    const tablename = req.query.tablename; // Extract stateid from query parameters
    const sql = `SELECT DISTINCT year_val FROM ${tablename} order by year_val`;
    if (tablename == "Precipitation_2004_2011") {
        db.query(sql, tablename, (err, data) => {
            if (err)
                return res.json(err);
            return res.json(data);
        });
    }
    else {
        db.query(sql, tablename, (err, data) => {
            if (err)
                return res.json(err);
            return res.json(data);
        });
    }
});
app.get('/yearAfter', (req, res) => {
    const tablename = req.query.tablename; // Extract stateid from query parameters
    const selectedFromYear = req.query.selectedFromYear;
    const sql = `SELECT DISTINCT year_val FROM ${tablename} WHERE year_val >= ${selectedFromYear} ORDER BY year_val`;
    if (tablename == "Precipitation_2004_2011") {
        db.query(sql, tablename, (err, data) => {
            if (err)
                return res.json(err);
            return res.json(data);
        });
    }
    else {
        db.query(sql, tablename, (err, data) => {
            if (err)
                return res.json(err);
            return res.json(data);
        });
    }
});
app.get('/final', (req, res) => {
    const tablename = req.query.tablename; // Extract stateid from query parameters
    const selectedFromYear = req.query.selectedFromYear;
    const selectedToYear = req.query.selectedToYear;
    const districtid = req.query.districtid;
    const stateid = req.query.stateid;
    const sql = `SELECT * 
    FROM ${tablename} 
    WHERE year_val BETWEEN ${selectedFromYear} AND ${selectedToYear} 
    AND stateid = ${stateid}
    AND districtid = ${districtid}`;
    if (tablename == "Precipitation_2004_2011") {
        db.query(sql, tablename, (err, data) => {
            if (err)
                return res.json(err);
            return res.json(data);
        });
    }
    else {
        db.query(sql, tablename, (err, data) => {
            if (err)
                return res.json(err);
            return res.json(data);
        });
    }
});
app.get('/final2', (req, res) => {
    const tablename = req.query.tablename; // Extract stateid from query parameters
    const selectedFromYear = req.query.selectedFromYear;
    const selectedToYear = req.query.selectedToYear;
    const district = req.query.District;
    const state = req.query.State;
    const sql = `SELECT * 
    FROM ${tablename} 
    WHERE year_val BETWEEN ${selectedFromYear} AND ${selectedToYear} 
    AND State = ${state}
    AND District = ${district}`;
    db.query(sql, tablename, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
app.listen(PORT, () => {
    console.log("listening");
});
module.exports = app;
module.exports = db;
