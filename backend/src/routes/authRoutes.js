const express = require('express');
const passport = require('passport');
const { 
    register, 
    login, 
    logout 
} = require('../controllers/authController');

const router = express.Router();

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
 * /auth/logout:
 *   get:
 *     summary: Logout
 *     description: Log out the authenticated user by invalidating the JWT token.
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []  # This indicates that this endpoint requires authentication via Bearer token
 *     responses:
 *       200:
 *         description: Successfully logged out.
 */
router.get('/auth/logout', logout);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { session: false }), 
    (req, res) => {
        // 在成功认证后，返回用户信息和 token
        console.log(req.user);
        res.json({ user: req.user, token: req.user.token });
    }
);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback', passport.authenticate('github', { session: false }), 
    (req, res) => {
        // 在成功认证后，返回用户信息和 token
        console.log(req.user);
        res.json({ user: req.user, token: req.user.token });
    }
);

module.exports = router;
