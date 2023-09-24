const express = require('express');
const router = express.Router();
const userController = require('../contoller/userController');
const auth = require('../authMiddleware'); 

router.post('/register', userController.registerUser);
router.post('/logino', userController.loginUser);

router.get('/messages', auth, userController.getUserMessages); 
router.post('/addmess', auth, userController.addMessageToUser); 
router.get('/admin', auth, userController.getAllUsers); 

module.exports = router;
