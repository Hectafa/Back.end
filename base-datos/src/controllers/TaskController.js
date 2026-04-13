const Task = require('../models/task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (err) {
        console.log('error', err);
    }
}

exports.createTask = async (req, res) => {
    try {
        const task = new Task(
            { description: req.body.description });
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        console.log('error', err);
        res.status(400).send({ error: err });
    }
}

exports.updateTasks = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        }
        res.send(task);
    } catch (err) {
        console.log('error', err);
        res.status(400).send({ error: err });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
        } else {
            res.status(204).send();
        }
    } catch (err) {
        console.log('error', err);
        res.status(400).send({ error: err });
    }
}