const express = require('express');
const passport = require('passport');
const { register, login } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authmiddlewares');

const router = express.Router();
// root route: http://localhost:3000/api/auth


/**
 * @swagger
 * /register:
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
router.post('/register', register);

/**
 * @swagger
 * /login:
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
router.post('/login', login);

/**
 * @swagger
 * /profile:
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
router.get('/profile', verifyToken);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false }), 
    (req, res) => {
        // 在成功认证后，返回用户信息和 token
        console.log(req.user);
        res.json({ user: req.user, token: req.user.token });
    }
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { session: false }), 
    (req, res) => {
        // 在成功认证后，返回用户信息和 token
        console.log(req.user);
        res.json({ user: req.user, token: req.user.token });
    }
);

module.exports = router;
