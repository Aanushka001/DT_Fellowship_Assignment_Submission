import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import NudgeController from './controllers/nudgeController.js';
import createNudgeRoutes from './routes/nudgeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

const client = new MongoClient('mongodb://localhost:27017');
const dbName = 'nudgeDatabase';

async function connectToDatabase() {
  try {
    await client.connect();
    return client.db(dbName);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

const db = await connectToDatabase();

const nudgeController = new NudgeController(db);
const nudgeRoutes = createNudgeRoutes(nudgeController);

app.use('/api/v3/app/nudges', nudgeRoutes);

app.post('/api/v3/app/submit', upload.single('image'), async (req, res) => {
  const { type, name, tagline, scheduleDate, scheduleTime, description, category, sub_category, rigor_rank, attendees } = req.body;
  const image = req.file;

  const userId = uuidv4();

  const nudgeData = {
    type,
    uid: userId,
    name,
    tagline,
    schedule: new Date(`${scheduleDate}T${scheduleTime}`),
    description,
    image: image ? image.path : null,
    moderator: new ObjectId(),
    category,
    sub_category,
    rigor_rank: parseInt(rigor_rank, 10),
    attendees: attendees.split(',').map(id => id.trim()),
  };

  try {
    const result = await db.collection('nudges').insertOne(nudgeData);
    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

app.get('/api/v3/app', (req, res) => {
  res.sendFile(path.join(dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/v3/app`);
});