express = require('express');
const { getAllUsers, getUserById, getRecommendations} = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddlewares');

const router = express.Router();

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

 /**
  * @swagger
  * /users/{id}:
  *   get:
  *     summary: Get user by ID
  *     description: Retrieve a user by their ID.
  *     tags: [Users]
  *     parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *           type: string
  *         description: The ID of the user to retrieve.
  *     responses:
  *       200:
  *         description: The user with the specified ID.
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 id:
  *                   type: string
  *                 username:
  *                   type: string
  */
 router.get('/users/:id', verifyToken, getUserById);

 /**
  * @swagger
  * /users/{user_id}/recommended-tasks:
  *   get:
  *     summary: Get recommended tasks for a user
  *     description: Retrieve a list of recommended tasks for a user.
  *     tags: [Users]
  *     parameters:
  *       - in: path
  *         name: user_id
  *         required: true
  *         schema:
  *           type: string
  *         description: The ID of the user to retrieve recommended tasks for.
  *     responses:
  *       200:
  *         description: A list of recommended tasks for the user.
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  *                 properties:
  *                   id:
  *                     type: string
  *                   title:
  *                     type: string
  *                   description:
  *                     type: string
  *                   status:
  *                     type: string
  *                   created_at:
  *                     type: string
  *                   updated_at:
  *                     type: string
  *                   user_id:
  *                     type: string
  */
 router.get('/users/:user_id/recommendations', verifyToken, getRecommendations);

 module.exports = router;