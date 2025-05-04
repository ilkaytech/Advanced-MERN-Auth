import { api } from "../../../tests/setup";

describe("Auth: Register & Login", () => {
  const userData = {
    name: "Jest User",
    email: "jestuser@example.com",
    password: "Jest1234!",
    confirmPassword: "Jest1234!",
  };

  it("should register a user", async () => {
    const res = await api.post("/api/v1/auth/register").send(userData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("email", userData.email);
  });

  it("should not register same email twice", async () => {
    await api.post("/api/v1/auth/register").send(userData);
    const res = await api.post("/api/v1/auth/register").send(userData);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errorCode", "AUTH_EMAIL_ALREADY_EXISTS");
  });

  it("should login with correct credentials", async () => {
    await api.post("/api/v1/auth/register").send(userData);
    const res = await api.post("/api/v1/auth/login").send({
      email: userData.email,
      password: userData.password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body).toHaveProperty("user");
  });
});

describe("Refresh Token", () => {
  it("should refresh tokens", async () => {
    const { body } = await api.post("/api/v1/auth/register").send({
      name: "Refresh User",
      email: "refresh@example.com",
      password: "Pass1234!",
      confirmPassword: "Pass1234!",
    });

    const cookie = body.refreshToken;

    const res = await api
      .get("/api/v1/auth/refresh")
      .set("Cookie", [`refreshToken=${cookie}`]);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });
});

describe("Session", () => {
  let token = "";

  beforeEach(async () => {
    const { body } = await api.post("/api/v1/auth/register").send({
      name: "Session User",
      email: "session@example.com",
      password: "Pass1234!",
      confirmPassword: "Pass1234!",
    });

    token = body.accessToken;
  });

  it("should get session data", async () => {
    const res = await api
      .get("/api/v1/session")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});

describe("MFA", () => {
  let token = "";

  beforeEach(async () => {
    const { body } = await api.post("/api/v1/auth/register").send({
      name: "MFA User",
      email: "mfa@example.com",
      password: "Pass1234!",
      confirmPassword: "Pass1234!",
    });

    token = body.accessToken;
  });

  it("should generate MFA setup", async () => {
    const res = await api
      .get("/api/v1/mfa/setup")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("otpauth_url");
    expect(res.body).toHaveProperty("base32");
  });
});
