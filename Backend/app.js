const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ChatRouter = require('./routes/ChatRouter');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

dotenv.config();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001'], // Allow this origin
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Logging request details
app.use((req, res, next) => {
    console.log("Request received:", req.method, req.url);
    next();
});

// Routing
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/llm', ChatRouter);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Server
const port = process.env.PORT || 3000; // Default port if PORT is not set in .env
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});