import { ObjectId } from 'mongodb';

const Nudge = {
  type: String,
  name: String,
  tagline: String,
  scheduleDate: Date,
  scheduleTime: String,
  image: String,
  description: String,
  callToAction: String,
  uid: String,
  moderator: String,
  category: String,
  subCategory: String,
  rigorRank: String,
  attendees: [String],
};

export { Nudge, ObjectId };