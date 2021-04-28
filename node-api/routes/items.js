const express = require('express');
const items = require('../src/items');
const itemDetail = require('../src/itemDetail');
let router = express.Router();

router.get('/', items.fetchItemsList);
router.get('/:itemId', itemDetail.fetchProductById);

module.exports = router;