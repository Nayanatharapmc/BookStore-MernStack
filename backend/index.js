import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
//import dotenv from "dotenv";
//dotenv.config();


const app = express();

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});



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