# Nudge Creation API

## Project Overview
This project provides a system for creating, managing, and deleting "nudges" using a MongoDB database. It includes full CRUD (Create, Read, Update, Delete) functionality and follows a schema-independent approach for flexibility.

## How to Run the Project

1. **Install Dependencies**:
   Make sure to install all required dependencies using:
   ```bash
   npm install
   ```

2. **Start the Server**:
   Run the following command to start the server:
   ```bash
   npm start
   ```

3. **Database Configuration**:
   - **Database Name**: `nudgeDB`
   - **Database URL**: `mongodb://localhost:27017`
   
   Ensure MongoDB is running locally on port `27017`. You can configure the database URL in your environment variables for production.

## API Endpoints

### 1. **Create a New Nudge**
   - **URL**: `http://localhost:3001/api/v3/app/submit`
   - **Method**: `POST`
   - **Description**: Submit a new nudge by providing form data including event details and an image file.

### 2. **Fetch All Nudges**
   - **URL**: `http://localhost:3001/api/v3/app`
   - **Method**: `GET`
   - **Description**: Retrieve all nudges stored in the database.

### 3. **Update a Nudge**
   - **URL**: `http://localhost:3001/api/v3/app/:id`
   - **Method**: `PUT`
   - **Description**: Update an existing nudge by providing its `id` in the URL and submitting the updated data.

### 4. **Delete a Nudge**
   - **URL**: `http://localhost:3001/api/v3/app/:id`
   - **Method**: `DELETE`
   - **Description**: Delete a specific nudge by providing its `id` in the URL.

## Summary of Actions

- **POST**: Create a new nudge.
- **GET**: Retrieve all nudges.
- **PUT**: Update a specific nudge by ID.
- **DELETE**: Delete a specific nudge by ID.

## Notes
- Ensure MongoDB is running before starting the server.
- No fixed schema is used for MongoDB, providing flexibility to add or remove fields in the future.
- Use the `_id` field (MongoDB ObjectId) as the unique identifier for operations.

