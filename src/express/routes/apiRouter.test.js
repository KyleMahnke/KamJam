const request = require("supertest");
const app = require("../app");

describe("apiRouter", () => {
  it("should respond to /api with a 200", async () => {
    const response = await request(app).get("/api");
    expect(response.statusCode).toBe(200);
  });
});

describe("apiRouter", () => {
  it("should respond to /express/routes/users with a 200", async () => {
    const response = await request(app).get("/express/routes/users");
    expect(response.statusCode).toBe(200);
  });
});
