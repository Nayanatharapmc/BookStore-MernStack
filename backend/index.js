import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/BookModel.js";
//import dotenv from "dotenv";
//dotenv.config();


const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/',(request,response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

// Route for save a new Book
app.post('/books', async(request, response) => {
    try {
        if(!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({message: 'Please fill all required fields'});
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
        
    }catch (error) {
        console.log('Error: ', error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for get all books from the database
app.get('/books', async(request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length,
            data: books
        });
    }catch (error) {
        console.log('Error: ', error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for get one book from the database by id
app.get('/books/:id', async(request, response) => {
    try {
        const {id} = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    
    }catch (error) {
        console.log('Error: ', error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for update a book by id
app.put('/books/:id', async(request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({message: 'Please fill all required fields'});
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book updated successfully'});
    } catch (error) {
        console.log('Error: ', error.message);
        response.status(500).send({message: error.message});
    }
})

// Route for delete a book by id
app.delete('/books/:id', async(request, response) => {
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).send({message: 'Book not found'});
        }
        return response.status(200).send({message: 'Book deleted successfully'});
    } catch (error) {
        console.log('Error: ', error.message);
        response.status(500).send({message: error.message});
    }
})
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