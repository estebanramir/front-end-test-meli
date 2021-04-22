const express = require('express');
const items = require('../src/items');
let router = express.Router();

/* GET para obtener una compañia en particular */
router.get('/', items.fetchItemsList);
router.get('/:itemId', items.fetchItemById);

module.exports = router;