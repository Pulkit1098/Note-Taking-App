# Note Taking App

## Description
The Note Taking App is a full-stack web application designed to help users organize and manage their notes efficiently. Users can create an account, log in, and perform CRUD (Create, Read, Update, Delete) operations on their notes. The app ensures security with JWT-based authentication and features a clean, user-friendly interface built with modern web technologies.

## Features
- User Authentication:
  - Sign up with name, email, and password.
  - Secure login using JWT tokens.
- Create, read, update, and delete notes.
- Responsive and interactive user interface.
- Backend built with a robust and scalable architecture.

## Technologies Used
### Frontend
- **React**: For building reusable UI components.
- **React Router**: For seamless navigation between pages.
- **Bootstrap**: For responsive and modern styling.

### Backend
- **Express.js**: For building the server and handling API requests.
- **MongoDB**: As the database to store user data and notes.
- **Vanilla JavaScript**: For certain backend utilities and logic.

### Authentication
- **JWT (JSON Web Token)**: For secure user authentication and session management.

## Prerequisites
To run this project, ensure you have:
- Node.js and npm installed.
- MongoDB installed and running locally or a MongoDB Atlas account for cloud hosting.
- A modern web browser.

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Pulkit1098/NoteTakingApp.git
   ```
2. Navigate to the project directory:
   ```bash
   cd NoteTakingApp
   ```

### Frontend Setup
3. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
4. Install frontend dependencies:
   ```bash
   npm install
   ```
5. Start the frontend development server:
   ```bash
   npm start
   ```

### Backend Setup
6. Navigate to the backend folder:
   ```bash
   cd backend
   ```
7. Install backend dependencies:
   ```bash
   npm install
   ```
8. Set up environment variables by creating a `.env` file in the backend folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
9. Start the backend server:
   ```bash
   npm run dev
   ```

## Usage
1. Open the app in your browser (e.g., `http://localhost:3000`).
2. Sign up with your name, email, and password.
3. Log in using your credentials.
4. Create, view, edit, and delete your notes from the dashboard.

## Screenshots
(Add screenshots or GIFs of the application showcasing key features.)

## Project Structure
```
NoteTakingApp/
|-- frontend/
|   |-- src/
|   |   |-- components/       # React components
|   |   |-- pages/            # Pages for routing
|   |   |-- App.js            # Main React app
|   |-- public/               # Static files
|   |-- package.json          # Frontend dependencies
|-- backend/
|   |-- routes/               # API routes
|   |-- models/               # Mongoose models
|   |-- controllers/          # Route handlers
|   |-- server.js             # Main server file
|   |-- package.json          # Backend dependencies
|-- README.md
```

## API Endpoints
### Authentication
- **POST** `/api/auth/signup`: Create a new user account.
- **POST** `/api/auth/login`: Log in and receive a JWT token.

### Notes
- **GET** `/api/notes`: Fetch all notes for the authenticated user.
- **POST** `/api/notes`: Create a new note.
- **PUT** `/api/notes/:id`: Update a note by ID.
- **DELETE** `/api/notes/:id`: Delete a note by ID.

## Future Enhancements
- Add a feature to share notes with other users.
- Implement search functionality to find notes quickly.
- Add support for rich-text formatting in notes.
- Include a dark mode for better user experience.

## Contributing
Contributions are welcome! If you have ideas for improvements, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- [React](https://reactjs.org/) for the frontend framework.
- [Bootstrap](https://getbootstrap.com/) for styling.
- [Express.js](https://expressjs.com/) for the backend framework.
- [MongoDB](https://www.mongodb.com/) for the database.
  
