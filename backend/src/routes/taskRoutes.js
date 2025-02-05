const express = require('express');
const { verifyToken } = require('../middlewares/authMiddlewares');
const router = express.Router();

const {
    getAllTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks for the authenticated user
 *     description: This API will return all tasks of the authenticated user, sorted by due date.
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.get('/tasks', verifyToken, getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a specific task by its ID
 *     description: This API will return a specific task based on the provided task ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the task to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Task found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.get('/tasks/:id', verifyToken, getTaskById);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     description: This API will create a new task for the authenticated user.
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - dueDate
 *               - priority
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *                 enum: [1, 2, 3]
 *               status:
 *                 type: string
 *                 enum: [Pending, InProgress, Completed]
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.post('/tasks', verifyToken, addTask);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update an existing task
 *     description: This API will update an existing task's information based on the provided task ID.
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the task to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               priority:
 *                 type: string
 *                 enum: [1, 2, 3]
 *               status:
 *                 type: string
 *                 enum: [pending, in-progress, completed]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       400:
 *         description: Bad request, invalid data
 */
router.put('/tasks/:id', verifyToken, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: This API will delete a task by its ID.
 *     tags: [Tasks]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the task to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized, token missing or invalid
 */
router.delete('/tasks/:id', verifyToken, deleteTask);

module.exports = router;
