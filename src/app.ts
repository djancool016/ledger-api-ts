import "reflect-metadata";
import express from 'express';
import cookieParser from 'cookie-parser';
import { dbConnect } from './db'; 
import { errorHandler } from "./utils/ErrorHandler";

const app = express()

dbConnect()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', require('./routes'))
app.use(errorHandler as express.ErrorRequestHandler)

export default app