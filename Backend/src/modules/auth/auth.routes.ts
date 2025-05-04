import { Router } from "express";
import { authController } from "./auth.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";

const authRoutes = Router();

/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterInput"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input or user already exists
 */
authRoutes.post("/register", authController.register);

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login user and return tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginInput"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
authRoutes.post("/login", authController.login);

/**
 * @openapi
 * /api/v1/auth/verify/email:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify user email with code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email verified
 *       400:
 *         description: Invalid code or email
 */
authRoutes.post("/verify/email", authController.verifyEmail);

/**
 * @openapi
 * /api/v1/auth/password/forgot:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send password reset code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset code sent
 *       404:
 *         description: User not found
 */
authRoutes.post("/password/forgot", authController.forgotPassword);

/**
 * @openapi
 * /api/v1/auth/password/reset:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Reset password using code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/PasswordResetInput"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid code or email
 */
authRoutes.post("/password/reset", authController.resetPassword);

/**
 * @openapi
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Logout user and clear session
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRoutes.post("/logout", authenticateJWT, authController.logout);

/**
 * @openapi
 * /api/v1/auth/refresh:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Refresh access token
 *     responses:
 *       200:
 *         description: Token refreshed
 */
authRoutes.get("/refresh", authController.refreshToken);

export default authRoutes;
