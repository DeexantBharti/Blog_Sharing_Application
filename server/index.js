import express from 'express';

import dotenv from 'dotenv';

import Connection from './Database/db.js';

import Router from './routes/route.js'; 
dotenv.config();

import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded.apply({  extended: true}))
app.use('/' , Router);

const PORT = 8000;

app.listen(PORT, () => console.log(`server is running successfully on hello ${PORT}`)); 

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);