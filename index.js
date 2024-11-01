require('dotenv').config(); // Load environment variables from a .env file into process.env

const express = require('express');              // Import Express to create the server
const bodyParser = require('body-parser');       // Import body-parser to parse incoming request bodies
const multer = require('multer');                // Import multer for handling file uploads
const mongoose = require('mongoose');            // Import mongoose for MongoDB interaction
const cors = require('cors');                    // Import cors to enable Cross-Origin Resource Sharing

// Initialize an Express application
const app = express();
const PORT = process.env.PORT || 5500; // Set the server port from environment variables or default to 5500
const startPage = 'index.html';        // Define the main entry HTML file

// Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(cors());

// Configure body-parser to handle URL-encoded data and JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory (e.g., HTML, CSS, JS)
app.use(express.static('./public'));

// Connect to MongoDB using the MONGODB_URI environment variable from .env file
mongoose.connect(
    process.env.MONGODB_URI,
).then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

  // Set up multer to store uploaded files in memory as buffer objects
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); // Create an upload handler with memory storage


// Define a route to serve the main HTML page at the root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/' + startPage); // Send the 'index.html' file as a response
});

// Start the server on the defined PORT
const server = app.listen(PORT, function () {
    // Retrieve the server's network address information
    const address = server.address();
    // Construct the base URL, defaulting to 'localhost' if IPv6 loopback address is used
    const baseUrl = `http://${address.address === '::' ? 'localhost' : address.address}:${address.port}`;
    console.log(`BookTrack app running at: ${baseUrl}`);
});

// Export the app and server instances for use in other modules or testing
module.exports = { app, server };