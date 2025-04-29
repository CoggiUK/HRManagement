import { Router } from 'express';
import UserController from '../Controllers/UserController.js';

const router = Router();

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserId:
 *                     type: integer
 *                   UserName:
 *                     type: string
 *                   Role:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', UserController.getAllUsers);

export default router;
