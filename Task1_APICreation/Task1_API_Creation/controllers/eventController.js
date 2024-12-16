import { connectDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

function transformEventData(event) {
    return {
        event_id: event._id.toString(),
        event_name: event.name,
        event_date: event.schedule ? new Date(event.schedule).toISOString() : null,
        event_location: event.location || "",
        event_type: event.sub_category || "Event",
        description: event.description || "",
        participants: event.attendees ? event.attendees.map(attendee => ({
            name: `User ${attendee}`,
            role: "Participant"
        })) : []
    };
}

export async function getEvents(req, res, next) {
    try {
        const db = await connectDB();
        const { id, limit = 10, page = 1 } = req.query;

        const parsedLimit = parseInt(limit, 10);
        const parsedPage = parseInt(page, 10);

        if (isNaN(parsedLimit) || parsedLimit <= 0 || isNaN(parsedPage) || parsedPage <= 0) {
            return next(new Error(`Invalid pagination parameters: limit = ${limit}, page = ${page}`));
        }

        if (id) {
            try {
                const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
                if (!event) {
                    return next(new Error(`Event with ID ${id} not found`));
                }
                return res.json(transformEventData(event));
            } catch (idError) {
                return next(new Error("Invalid event ID format"));
            }
        }

        const query = {};
        const totalEvents = await db.collection('events').countDocuments(query);
        const totalPages = Math.ceil(totalEvents / parsedLimit);

        const events = await db.collection('events')
            .find(query)
            .sort({ schedule: -1 })
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit)
            .toArray();

        const transformedEvents = events.map(transformEventData);

        res.json({
            events: transformedEvents,
            page: parsedPage,
            limit: parsedLimit,
            total_pages: totalPages
        });
    } catch (error) {
        next(error);
    }
}

export async function updateEvent(req, res, next) {
    try {
        const db = await connectDB();
        const { id } = req.params;
        const updatedData = req.body;

        const result = await db.collection('events').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedData }
        );

        if (result.matchedCount === 0) {
            return next(new Error(`Event with ID ${id} not found`));
        }

        res.json({ message: "Event updated successfully", event_id: id });
    } catch (error) {
        next(error);
    }
}

export async function deleteEvent(req, res, next) {
    try {
        const db = await connectDB();
        const { id } = req.params;

        const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return next(new Error(`Event with ID ${id} not found`));
        }

        res.json({ message: "Event deleted successfully", event_id: id });
    } catch (error) {
        next(error);
    }
}

export async function createEvent(req, res, next) {
    try {
        const db = await connectDB();
        const { name, tagline, schedule, description, files, moderator, category, sub_category, rigor_rank, attendees } = req.body;

        if (!name || !tagline || !schedule) {
            return next(new Error("Event name, tagline, and schedule are required"));
        }

        const eventDate = new Date(schedule);
        if (isNaN(eventDate.getTime())) {
            return next(new Error("Invalid event schedule format"));
        }

        const newEvent = {
            type: "event",
            uid: req.user ? req.user.id : undefined,
            name: name,
            tagline: tagline,
            schedule: eventDate.toISOString(),
            description: description || "",
            files: {
                image: files?.image || null
            },
            moderator: moderator,
            category: category || "General",
            sub_category: sub_category || "General",
            rigor_rank: rigor_rank || 1,
            attendees: attendees || []
        };

        const result = await db.collection('events').insertOne(newEvent);

        const response = {
            message: "Event created successfully",
            event_id: result.insertedId.toString(),
            event_name: name,
            event_date: newEvent.schedule,
            event_location: "",
            event_type: category,
            description: description || "",
            participants: attendees.map(attendeeId => ({
                name: `User ${attendeeId}`,
                role: "Participant"
            }))
        };

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
}
