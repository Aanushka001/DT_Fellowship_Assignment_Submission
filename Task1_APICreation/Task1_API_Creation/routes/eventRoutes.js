import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
const router = express.Router();
router.get('/events', getEvents);
router.put('/events/:id', updateEvent);
router.post('/events', createEvent);
router.delete('/events/:id', deleteEvent);
export default router;
