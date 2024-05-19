const express =require('express');
const router =express.Router();
const listController =require('../controllers/listCont')
router.post('/', listController.createList);

module.exports = router;