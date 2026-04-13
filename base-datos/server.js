const express = require('express');
const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routes/TaskRoutes');
const port = 3000;

const app = express();

connectDB(app);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenuto a la API de tareas');
});

app.use('/api', taskRoutes);

app.listen(port, () => {
    console.log('server running on port:', port);
});