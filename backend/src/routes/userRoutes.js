express = require('express');
const { getAllUsers } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/userMiddlewares');

const router = express.Router();

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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users in the system.
 *     tags: [Users]
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
 router.get('/users', getAllUsers);

 module.exports = router;