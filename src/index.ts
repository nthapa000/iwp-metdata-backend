const express = require('express')
import { Request,Response } from "express"
const mysql = require('mysql')
const cors = require('cors')
import { TableTypes } from "./types"
import { Precipitation_2004_2011 } from "./types"
const app = express()
app.use(cors())

