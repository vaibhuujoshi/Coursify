## About

Coursify is a web application for managing online courses and user enrollments. It simplifies course creation, user registration, and secure authentication.

Key features include:
*   Course management
*   User authentication and registration
*   Enrollment tracking

## Built With

*   **Node.js:** JavaScript runtime environment for server-side development.
*   **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
*   **Mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
*   **bcrypt:** Library for hashing passwords securely.

## Getting Started

Follow these steps to get Coursify up and running locally.

*   **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/coursify.git
    cd coursify
    ```

*   **Install dependencies:**
    Choose either npm or yarn:
    ```bash
    npm install
    # or
    yarn install
    ```

*   **Set up environment variables:**
    Create a `.env` file in the root directory and add your configuration. Refer to `.env.example` for required variables.

## Usage

*   **Development Server:** Run `npm run dev` to start the server with hot-reloading.
*   **Production Server:** Run `npm start` to launch the production-ready server.
*   **API Endpoints:**
    *   **Courses:**
        *   `GET /courses`: Retrieve all courses.
        *   `POST /courses`: Create a new course.
        *   `GET /courses/:id`: Get a specific course by ID.
        *   `PUT /courses/:id`: Update a course.
        *   `DELETE /courses/:id`: Delete a course.
    *   **Users:**
        *   `POST /users/register`: Register a new user.
        *   `POST /users/login`: Log in a user and receive a JWT.
        *   `GET /users/me`: Get the logged-in user's profile (requires JWT).

## Configuration

All configuration is managed via environment variables. Create a `.env` file in the project root to define these variables.

*   **Database Connection:** Set your MongoDB connection string using `DATABASE_URL`.
*   **JWT Secret:** Define your JSON Web Token secret key with `JWT_SECRET`. This is crucial for authentication.

## Contributing

We welcome your contributions to Coursify!

*   **Reporting Issues:** Please report any bugs or feature requests via the [Issues](https://github.com/yourusername/coursify/issues) page.
*   **Submitting Pull Requests:** Fork the repository, make your changes, and submit a pull request. Please ensure your code adheres to our coding standards. Refer to our detailed [Contributing Guidelines](https://github.com/yourusername/coursify/blob/main/CONTRIBUTING.md) for more information.

## License

This project is licensed under the ISC License. This means you are free to use, modify, and distribute the code for any purpose, including commercial use, without attribution.