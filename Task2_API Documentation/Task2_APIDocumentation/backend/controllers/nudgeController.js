import { ObjectId } from 'mongodb';

class NudgeController {
  constructor(db) {
    this.db = db;
  }

  async getAllNudges(req, res) {
    const { page = 1, limit = 10, filter = '', sortBy = 'name', sortOrder = 'asc' } = req.query;
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const filterQuery = filter
      ? { $or: [{ name: { $regex: filter, $options: 'i' } }, { type: { $regex: filter, $options: 'i' } }] }
      : {};

    try {
      const nudges = await this.db.collection('nudges')
        .find(filterQuery)
        .skip(skip)
        .limit(Number(limit))
        .sort(sort)
        .toArray();

      const totalNudges = await this.db.collection('nudges').countDocuments(filterQuery);

      res.status(200).json({
        nudges,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(totalNudges / limit),
          totalNudges,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch Nudges', error });
    }
  }

  async createNudge(req, res) {
    const { type, name, tagline, scheduleDate, scheduleTime, description, category, sub_category, rigor_rank, attendees } = req.body;

    const nudgeData = {
      type,
      name,
      tagline,
      schedule: new Date(`${scheduleDate}T${scheduleTime}`),
      description,
      category,
      sub_category,
      rigor_rank: parseInt(rigor_rank, 10),
      attendees: attendees.split(',').map(id => id.trim()),
    };

    try {
      const result = await this.db.collection('nudges').insertOne(nudgeData);
      res.status(200).send('Nudge created successfully!');
    } catch (error) {
      res.status(500).send('Error creating nudge');
    }
  }

  async updateNudge(req, res) {
    const { id } = req.params;
    const { type, name, tagline, scheduleDate, scheduleTime, description, category, sub_category, rigor_rank, attendees } = req.body;

    const updatedData = {
      type,
      name,
      tagline,
      schedule: new Date(`${scheduleDate}T${scheduleTime}`),
      description,
      category,
      sub_category,
      rigor_rank: parseInt(rigor_rank, 10),
      attendees: attendees.split(',').map(id => id.trim()),
    };

    try {
      const result = await this.db.collection('nudges').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).send('Nudge not found or no changes made');
      }

      res.status(200).send('Nudge updated successfully!');
    } catch (error) {
      res.status(500).send('Error updating nudge');
    }
  }

  async deleteNudge(req, res) {
    const { id } = req.params;

    try {
      const result = await this.db.collection('nudges').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).send('Nudge not found');
      }

      res.status(200).send('Nudge deleted successfully!');
    } catch (error) {
      res.status(500).send('Error deleting nudge');
    }
  }
}

export default NudgeController;