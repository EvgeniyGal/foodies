import request from "supertest";
import {
  addCategory,
  deleteCategories,
} from "../services/categoriesServices.js";
import app from "../app.js";
import { db, closeDb } from "../db.js";

describe("GET /categories", () => {
  let server = null;

  beforeAll(async () => {
    await db();
    server = app.listen(process.env.PORT || 3000);
  });

  afterAll(async () => {
    await closeDb();
    await server.close();
  });

  beforeEach(async () => {
    await deleteCategories();
  });

  test("should return status 200", async () => {
    const { statusCode } = await request(app).get("/categories");

    expect(statusCode).toBe(200);
  });

  test("should return two categories", async () => {
    await addCategory({
      name: "Category 1",
    });
    await addCategory({
      name: "Category 2",
    });

    const { statusCode, body } = await request(app).get("/categories");

    expect(statusCode).toBe(200);
    expect(body.length).toBe(2);
  });
});
