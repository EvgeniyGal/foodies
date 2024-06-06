import request from 'supertest';
import Category from '../models/Category.js';
import app from '../app.js';
import { db, closeDb } from '../db.js';

describe('GET /categories', () => {
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
    await Category.deleteMany();
  });

  test('should return status 200', async () => {
    const { statusCode } = await request(app).get('/categories');

    expect(statusCode).toBe(200);
  });

  test('should return two categories', async () => {
    const categories = [{ name: 'Category 1' }, { name: 'Category 2' }];

    categories.forEach(async category => {
      await Category.create(category);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const { statusCode, body } = await request(app).get('/categories');

    expect(statusCode).toBe(200);
    expect(body.length).toBe(2);
  });
});
