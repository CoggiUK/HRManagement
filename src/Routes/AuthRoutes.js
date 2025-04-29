import { Router } from 'express';
import AuthController from '../Controllers/AuthController.js';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserName
 *               - Password
 *               - Role
 *             properties:
 *               UserName:
 *                 type: string
 *               Password:
 *                 type: string
 *               Role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', AuthController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - UserName
 *               - Password
 *             properties:
 *               UserName:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', AuthController.login);

export default router;
