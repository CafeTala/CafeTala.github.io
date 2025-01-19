const express = require('express');
const storeController = require('../controllers/storeController');

const router = express.Router();

router.get('/', storeController.getStoreList);
router.get('/:id', storeController.getStoreDetails);

module.exports = router;
