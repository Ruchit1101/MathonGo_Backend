const express = require('express');
const router =express.Router();
const userController =require('../controllers/userCont')
const multer = require('multer');
const upload=multer({dest:'uploads/'});

router.post('/:Id', upload.single('file'), userController.addUsers);
router.post('/:Id/send-email', userController.sendEmail);

module.exports = router;