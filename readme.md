# LikeMe App

The LikeMe App is a web application for creating, viewing, and managing posts. It provides functionalities to create new posts, like existing posts, and delete posts. Users can interact with the application through a simple API.

## Features

- Create a new post: Users can create a new post by providing a title, image URL, and description. The post is then saved in the database with an initial like count of 0.

- View all posts: Users can retrieve all posts from the database. The posts are returned in ascending order based on their ID.

- Like a post: Users can increase the like count of a post by sending a PUT request with the post ID. The like count of the post is updated in the database.

- Delete a post: Users can delete a post by sending a DELETE request with the post ID. The post is removed from the database.

## Technologies Used

The LikeMe App is built using the following technologies:

- Node.js: A JavaScript runtime environment for executing server-side code.
- Express.js: A fast and minimalist web application framework for Node.js.
- PostgreSQL: An open-source relational database management system.
- pg: A PostgreSQL client for Node.js that enables interaction with the database.
- CORS: A middleware for enabling Cross-Origin Resource Sharing.
- dotenv: A module for loading environment variables from a .env file.
- Nodemon: A development utility that automatically restarts the server upon file changes.

## Getting Started

To get started with the LikeMe App, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/jtca94/likeme-Backend-and-Front.git
```
or you can download the `.zip` file

2. Install the dependencies in client and server folders:

```bash
npm install
```

3. Set up the PostgreSQL database and configure the connection details in the `.env` file.

- Update the values with your PostgreSQL configuration

```plaintext
PGUSER=your_postgres_user
PGHOST=your_postgres_host
PGPASSWORD=your_postgres_password
PGDATABASE=your_postgres_database
PGPORT=your_postgres_port
PORT=3000
FRONTEND_URL=http://localhost:4000
```

4. Create the database `likeme` and the next table:

```sql
CREATE TABLE posts (
  id SERIAL,
  titulo VARCHAR(25),
  img VARCHAR(1000),
  descripcion VARCHAR(255),
  likes INT
);
```

5. Start the development server:

```bash
npm run dev
```
This command starts the server using Nodemon, which automatically restarts the server whenever changes are made to the code.

6. Run the client app

```bash
npm start
```
Access the application at http://localhost:4000 or the specified port.

## API Endpoints

The LikeMe App exposes the following API endpoints:

- `GET /posts`: Retrieves all posts from the database.
- `POST /posts`: Creates a new post.
- `PUT /posts/like/:id`: Likes a post.
- `DELETE /posts/:id`: Deletes a post.

## Error Handling

The LikeMe App incorporates error handling to provide meaningful error responses. The application includes an error handling middleware that catches any errors thrown during the request processing and returns an appropriate response to the client.

that's all for now!