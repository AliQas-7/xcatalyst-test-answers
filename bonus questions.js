
//Bonus qusestion 
//deletion api

const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Mock task data
let tasks = [
    { id: 1, title: 'Task 1', status: 'pending' },
    { id: 2, title: 'Task 2', status: 'completed' },
    // Add more tasks as needed
];

// DELETE Task API
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).send({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.send({ message: 'Task deleted successfully' });
});





//bonus question
// Search API


app.get('/tasks', (req, res) => {
    const { title, status, page = 1, limit = 10 } = req.query;

    let filteredTasks = tasks;

    if (title) {
        filteredTasks = filteredTasks.filter(task => task.title.includes(title));
    }

    if (status) {
        filteredTasks = filteredTasks.filter(task => task.status === status);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    res.send(paginatedTasks);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});