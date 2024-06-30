# Social-discussion API

**This Node.js application provides a RESTful API for a discussion forum where users can create discussions, post comments, like posts and comments, follow other users, and perform various other actions related to social interactions.**

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT) for authentication
- bcryptjs
- multer(file upload)

### Features

1. **User Management**

   - Create a new user account
   - Update user information
   - Delete user account
   - View list of users
   - Search for users by name

2. **Authentication**

   - Register and login using email and password
   - Token-based authentication using JWT
   - Protected routes for authenticated users

3. **Discussions**

   - Create a new discussion with text and optional image
   - Update and delete own discussions
   - Get discussions based on hashtags and text search

4. **Comments and Replies**

   - Comment on discussions
   - Reply to comments
   - Like comments and discussions
   - Update and delete own comments

5. **Social Interactions**
   - Follow other users
   - View followers and following list for each user
   - Like posts and comments of other users

### Getting Started

To get started with this project, follow these steps:

1. Clone the repository

```console
git clone https://github.com/shreyKataria/social-discussion.git
cd social-discussion
```

2. Install dependencies

`npm install`

3. Set up environment variables

```console
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE = '30d'
```

4. Start the server

`npm run dev`

5. Using the API

**All the api endpoints are mentioned above each controller**

6. Testing

> Use tools like Postman to test the API endpoints.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request with your improvements. 🙂

## License

This project is licensed under the [MIT] License
