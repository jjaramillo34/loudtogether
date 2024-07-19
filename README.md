# Loud Together

Loud Together is a web-based application where users can create and join sessions to listen to YouTube audio in sync. The app provides a dynamic wave animation to indicate new users joining the session, and only the session admin can control the playback.

## Features

- Create a session with a YouTube URL.
- Join a session using a session name.
- Dynamic wave animation when new users join.
- Admin-only playback controls (play, pause, next, reset).
- Real-time updates of connected users.

## Technologies Used

- React
- Express
- Socket.io
- Tailwind CSS
- Framer Motion

## Project Structure

```

loudtogether/
├── client/ # React frontend
├── server/ # Express backend
├── package.json

```

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/loudtogether.git
cd loudtogether
```

2. Install dependencies for both the client and server:

```sh
cd client
npm install
cd ../server
npm install
cd ..
```

### Running the Application

To run both the frontend and backend servers concurrently, use the following command:

```sh
npm start
```

This will start both servers using `concurrently`.

### Usage

1. Open your browser and go to `http://localhost:3000`.
2. Enter a YouTube URL and create a session.
3. Share the session name with other users so they can join.
4. Only the admin (the user who created the session) will have playback controls.
5. Enjoy listening together with synchronized audio and wave animations indicating new users joining the session.

## Project Structure

- `client/`: Contains the React frontend application.
- `server/`: Contains the Express backend application.
- `package.json`: Root package file with scripts to run the client and server concurrently.

## Backend API

### POST /create-session

- **Description**: Creates a new session with the provided YouTube URL.
- **Request Body**:
  ```json
  {
    "url": "https://www.youtube.com/watch?v=example"
  }
  ```
- **Response**:
  ```json
  {
    "sessionName": "generated-session-name",
    "sessionId": "generated-session-id"
  }
  ```

## Frontend Components

### Home.js

- Renders the home page where users can input a YouTube URL and create a session.

### Session.js

- Renders the session page where users can join a session, view connected users, and see playback controls if they are the admin.
- Uses `framer-motion` to create dynamic wave animations.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

```

You can save this content as `README.md` in your project's root directory. If you have any more questions or need further assistance, feel free to ask!
```
