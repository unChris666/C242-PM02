const axios = require('axios');
const { Chat } = require('../models');

// Controller function to generate a chat
exports.generatedChat = async (req, res) => {
      // Get the input data from the request body
      const message = {
        overview: req.body.overview || '',
        start_date: req.body.start_date || '',
        end_date: req.body.end_date || '',
        document_version: req.body.document_version || '',
        product_name: req.body.product_name || '',
        document_owner: req.body.document_owner || '',
        developer: req.body.developer || '',
        stakeholder: req.body.stakeholder || '',
        doc_stage: req.body.doc_stage || '',
        created_date: req.body.created_date || ''
      };
  
      console.log("Sending request to ML API at:", process.env.ENDPOINT_CHAT);
      const mlResponse = await axios.post(process.env.ENDPOINT_CHAT, req.body);
      
      const parsedResponse = JSON.parse(mlResponse.data);

      // Create a new Chat entry in the database with the message and response from ML
      const chat = await Chat.create({
        message: message, 
        response: parsedResponse,
        user_id: req.user.id 
      });
  
      // Send the response back to the client with the generated chat
      return res.status(200).json({
        status: "success",
        message: "Chat generated successfully",
        output: parsedResponse
      });
};

exports.getChats = async (req, res) => {
    try {
        const chats = await Chat.findAll({
            where: { user_id: req.user.id }
        });

        const parsedChats = chats.map(chat => ({
            id: chat.id,
            message: JSON.parse(chat.message),
            response: JSON.parse(chat.response),
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt
        }));

        return res.status(200).json({
            status: 'success',
            data: parsedChats
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch chats',
            error: error.message
        });
    }
};

exports.getChatById = async (req, res) => {
    try {
        const id = req.params.id;
        const chat = await Chat.findByPk(id);

        if (!chat) {
            return res.status(404).json({
                status: 'fail',
                message: 'Chat not found'
            });
        }

        // Check if the chat belongs to the logged-in user
        if (chat.user_id !== req.user.id) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to view this chat'
            });
        }
        
        return res.status(200).json({
            status: 'success',
            data: {
                id: chat.id,
                message: JSON.parse(chat.message),
                response: JSON.parse(chat.response),
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Failed to fetch the chat'
        });
    }
};

exports.deleteChat = async (req, res) => {
    const { id } = req.params;

    try {
        const chat = await Chat.findByPk(id);

        if (!chat) {
            return res.status(404).json({
                status: 'fail',
                message: 'Chat not found'
            });
        }

        // Check if the chat belongs to the logged-in user
        if (chat.user_id !== req.user.id) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to delete this chat'
            });
        }

        await chat.destroy();

        return res.status(200).json({
            status: 'success',
            message: 'Chat deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

// PUT: Update the response field of a chat
exports.updateChat = async (req, res) => {
    const { id } = req.params;
    const { response } = req.body; // Only update the response field

    try {
        // Find the chat by ID
        const chat = await Chat.findByPk(id);

        if (!chat) {
            return res.status(404).json({
                status: 'fail',
                message: 'Chat not found'
            });
        }

        // Check if the chat belongs to the logged-in user
        if (chat.user_id !== req.user.id) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to edit this chat'
            });
        }

        // Preprocess the response field
        chat.response = typeof response === 'string' ? JSON.parse(response) : response;

        // Save the updated chat instance
        await chat.save();

        return res.status(200).json({
            status: 'success',
            data: {
                id: chat.id,
                message: chat.message,
                response: chat.response, // Parsed and saved response
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};