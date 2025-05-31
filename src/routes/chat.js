const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');

const chatController = ChatController;

router.post('/send', chatController.sendMessage.bind(chatController));
router.get('/response', chatController.getResponse.bind(chatController));

module.exports = router;