import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Advanced Auth API",
      version: "1.0.0",
      description: "JWT, MFA, Email Verification, and Session Management API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        RegisterInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            password: {
              type: "string",
              minLength: 6,
              example: "12345678",
            },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "user@example.com" },
            password: { type: "string", example: "mypassword" },
          },
        },
        MFAInput: {
          type: "object",
          required: ["token"],
          properties: {
            token: { type: "string", example: "123456" },
          },
        },
        PasswordResetInput: {
          type: "object",
          required: ["email", "code", "newPassword"],
          properties: {
            email: { type: "string" },
            code: { type: "string" },
            newPassword: { type: "string" },
          },
        },
      },
      parameters: {
        SessionIdParam: {
          name: "id",
          in: "path",
          required: true,
          description: "ID of the session to delete",
          schema: {
            type: "string",
            example: "65ff10c9d1b2a60025d3c8c3",
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/modules/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
