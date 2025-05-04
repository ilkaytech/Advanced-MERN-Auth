import { Router } from "express";
import { mfaController } from "./mfa.module";
import { authenticateJWT } from "../../common/strategies/jwt.strategy";

const mfaRoutes = Router();

/**
 * @openapi
 * /api/v1/mfa/setup:
 *   get:
 *     tags:
 *       - MFA
 *     summary: Generate MFA setup QR code and secret
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns QR code image and secret
 *       401:
 *         description: Unauthorized
 */
mfaRoutes.get("/setup", authenticateJWT, mfaController.generateMFASetup);

/**
 * @openapi
 * /api/v1/mfa/verify:
 *   post:
 *     tags:
 *       - MFA
 *     summary: Verify MFA code to activate 2FA
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/MFAInput"
 *     responses:
 *       200:
 *         description: MFA verified and enabled
 *       400:
 *         description: Invalid token
 *       401:
 *         description: Unauthorized
 */
mfaRoutes.post("/verify", authenticateJWT, mfaController.verifyMFASetup);

/**
 * @openapi
 * /api/v1/mfa/revoke:
 *   put:
 *     tags:
 *       - MFA
 *     summary: Disable or revoke MFA for the user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: MFA disabled successfully
 *       401:
 *         description: Unauthorized
 */
mfaRoutes.put("/revoke", authenticateJWT, mfaController.revokeMFA);

/**
 * @openapi
 * /api/v1/mfa/verify-login:
 *   post:
 *     tags:
 *       - MFA
 *     summary: Verify MFA code during login step
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - token
 *             properties:
 *               email:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: MFA verified, login successful
 *       400:
 *         description: Invalid code
 */
mfaRoutes.post("/verify-login", mfaController.verifyMFAForLogin);

export default mfaRoutes;
