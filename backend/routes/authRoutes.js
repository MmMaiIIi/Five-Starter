const express = require('express');
const passport = require('passport');
const { getAllUsers, register, login } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authmiddlewares');

const router = express.Router();

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   username:
 *                     type: string
 */
router.get('/auth/users', getAllUsers);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing a username and password.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered the new user.
 *       400:
 *         description: Invalid input, the request body is missing or incorrect.
 */
router.post('/auth/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive an authentication token
 *     description: Log in with a username and password to receive an authentication token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in, returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid username or password.
 */
router.post('/auth/login', login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     description: Fetch the authenticated user's profile using the JWT token.
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []  # This indicates that this endpoint requires authentication via Bearer token
 *     responses:
 *       200:
 *         description: Successfully fetched the user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 */
router.get('/auth/profile', authMiddleware);

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Start Google OAuth authentication
 *     description: Redirect the user to Google for OAuth authentication.
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirect to Google OAuth.
 */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handle the Google OAuth callback and return the user and token.
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfully authenticated with Google.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 */
router.get('/auth/google/callback', passport.authenticate('google', {session: false }), 
    (req, res) => {
        res.json({ user: req.user, token: req.user.token });
    }
);

module.exports = router;
