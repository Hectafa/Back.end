const express = require('express');
const taskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTasks);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;