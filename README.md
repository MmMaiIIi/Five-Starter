# Five-Starter

A five-minute starter template for procrastinators. Get your app up and running in no time!

## Table of Contents
1. [Front-end Setup](#front-end-setup)
2. [Back-end Setup](#back-end-setup)
3. [Development Options](#development-options)
4. [API Documentation](#api-documentation)
5. [Notes](#notes)
6. [License](#license)

---

## Front-end Setup

To set up the front-end:

1. **Navigate to the Frontend Directory:**
   ```bash
   cd frontend/fivestart
   ```

2. **Install Necessary Packages:**
   You can use either `pnpm` or `npm` to install dependencies.
   ```bash
   pnpm install   # or
   npm install
   ```

3. **Access the Application:**
   Open your browser and go to:
   [http://localhost:3000](http://localhost:3000)

---

## Back-end Setup

To set up the back-end:

1. **Navigate to the Back-end Directory:**
   ```bash
   cd backend
   ```

2. **Install Necessary Packages:**
   You can use either `pnpm` or `npm` to install dependencies:
   ```bash
   pnpm install   # or
   npm install
   ```

3. **Run the Back-end Application:**
   To start the back-end server:
   ```bash
   pnpm start     # or
   npm start
   ```

4. **Test Authentication Routes:**
   Open a new terminal and run:
   ```bash
   node backend/src/routes/authRoutes.js
   ```

---

## Development Options

### Testing API for OAuth2 Authentication (Google, GitHub, etc.)

To test the API for OAuth2 authentication, you can use the `test.http` file included in the repository. This file contains predefined HTTP requests for testing the OAuth2 flow with Google, GitHub, and other services.

1. Open the `test.http` file in your preferred editor.
2. Run the requests as needed to verify OAuth2 authentication.

---

## API Documentation

You can view the API documentation for the back-end at the following URL:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

This will give you access to details about the available routes, request bodies, and responses.

---

## Notes

- Ensure that both the front-end and back-end servers are running on different terminals.
- The back-end API is available on `http://localhost:3000`, while the front-end will be accessible at `http://localhost:3000` or another available port.
- If you experience any issues with CORS, ensure that the appropriate CORS configuration is set up on the back-end.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

