import express from 'express';
import bodyParser from 'body-parser';
import eventRoutes from './routes/eventRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    res.send('Hi there! Welcome to the API!');
});

app.use('/api/v3/app', eventRoutes);

app.use((err, req, res, next) => {
    console.error(`Error at ${req.method} ${req.url}:`, err.stack);
    res.status(500).json({ message: "Something went wrong", error: err.message });
    next(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
