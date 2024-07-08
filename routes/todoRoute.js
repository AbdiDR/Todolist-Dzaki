// routes/todoRoutes.js
const express = require('express');
const TodoController = require('../controllers/todoControllers'); 

const router = express.Router();

router.get('/todos', TodoController.getItems);
router.post('/todos', TodoController.createItem);
router.put('/todos/:id', TodoController.updateItem);
router.delete('/todos/:id', TodoController.deleteItem);

module.exports = router;
