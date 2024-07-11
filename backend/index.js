import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/BookModel.js";
import bookRoute from "./routes/bookRoute.js";
//import dotenv from "dotenv";
//dotenv.config();


const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error: ', error);
    });