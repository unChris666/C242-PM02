const express = require('express');
const router = express.Router();
const { generatedChat, updateChat, getChats } = require('../controllers/ChatController');
const{ authMiddleware } = require('../middleware/UserMiddleware');

// POST /chats - Generate a chat
router.post('/chats', authMiddleware, generatedChat);

// PUT /chats/:id - Update an existing chat message
router.put('/chats/:id', authMiddleware, updateChat);

// GET /chats - Get all chats for a user 
router.get('/chats', authMiddleware, getChats);

module.exports = router;