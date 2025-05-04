import { Router } from "express";
import { sessionController } from "./session.module";

const sessionRoutes = Router();

/**
 * @openapi
 * /api/v1/session/all:
 *   get:
 *     tags:
 *       - Session
 *     summary: Get all active sessions for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all sessions
 *       401:
 *         description: Unauthorized
 */
sessionRoutes.get("/all", sessionController.getAllSession);

/**
 * @openapi
 * /api/v1/session:
 *   get:
 *     tags:
 *       - Session
 *     summary: Get current active session info
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current session details
 *       401:
 *         description: Unauthorized
 */
sessionRoutes.get("/", sessionController.getSession);

/**
 * @openapi
 * /api/v1/session/{id}:
 *   delete:
 *     tags:
 *       - Session
 *     summary: Delete (revoke) a specific session
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: "#/components/parameters/SessionIdParam"
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Session not found
 */
sessionRoutes.delete("/:id", sessionController.deleteSession);

export default sessionRoutes;
