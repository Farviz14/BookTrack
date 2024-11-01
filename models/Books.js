const { Schema, model } = require('mongoose');

// Define a schema for the Book model, which outlines the structure of each book document in the database
const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    availableCopies: { type: Number, required: true, min: 0 },
    image: { type: String, required: true }, // Store Base64 image
}, { timestamps: true });

module.exports = model('Books', BookSchema);
