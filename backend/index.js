import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/BookModel.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
//import dotenv from "dotenv";
//dotenv.config();


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for enabling CORS policy
// Option1: Allow all origins with default of cors(*)
//app.use(cors());
// Option2: Allow custom origins
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

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