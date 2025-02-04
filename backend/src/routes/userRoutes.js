express = require('express');
const { getAllUsers } = require('../controllers/userController');

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

 module.exports = router;