>> Overview
This is an Event Management API built with Node.js, Express, and MongoDB.

>> Prerequisites
- Node.js
- MongoDB

>> Installation
1. Clone the repository
2. Run `npm install`
3. Ensure MongoDB is running locally

>> Configuration
- MongoDB Connection: `mongodb://localhost:27017`
- Database Name: `taskDB`

>> API Endpoints
- `GET /api/v3/app/events/:id`: Get event by ID
- `GET /api/v3/app/events`: Get events with pagination
  - Query Parameters:
    - `type`: Event type (default: "event")
    - `limit`: Number of events per page (default: 10)
    - `page`: Page number (default: 1)
- `POST /api/v3/app/events`: Create a new event
- `PUT /api/v3/app/events/:id`: Update an existing event
- `DELETE /api/v3/app/events/:id`: Delete an event

>> Running the Application:```npm start```

>> Testing
Use Postman to test the API endpoints like:

1. Get Event by ID
   - Method: `GET`
   - Description: Fetch a specific event using its unique ID.
   - Sample URL: `http://localhost:5000/api/v3/app/events/12345`

2. Get Events with Pagination
   - Method: `GET`
   - Description: Retrieve events with pagination support.
   - Query Parameters(optional):
     - `type` : Event type (default: "event")
     - `limit` : Number of events per page (default: 10)
     - `page` : Page number (default: 1)
   - Sample URL: `http://localhost:5000/api/v3/app/events?limit=10&page=1`

3. Create a New Event
   - Method: `POST`
   - Description: Add a new event to the database.
   - Sample URL: `http://localhost:3000/api/v3/app/events`
   - Sample Request Body (JSON format):
     ```
     {
         "name": "Sample Event",
         "tagline": "This is a sample event.",
         "schedule": "2024-12-20T14:00:00Z",
         "description": "Detailed description of the event.",
         "files": { "image": "image_url" },
         "moderator": "John Doe",
         "category": "Workshop",
         "sub_category": "Tech",
         "rigor_rank": 5,
         "attendees": ["UserID1", "UserID2"]
     }
     ```

4. Update an Existing Event
   - Method: `PUT`
   - Description: Modify an existing event by its unique ID.
   - Sample URL: `http://localhost:3000/api/v3/app/events/12345`

5. Delete an Event
   - Method: `DELETE`
   - Description: Delete a specific event by its ID.
   - Sample URL: `http://localhost:3000/api/v3/app/events/12345`
