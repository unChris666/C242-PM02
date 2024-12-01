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