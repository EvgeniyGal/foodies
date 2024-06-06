import request from 'supertest';
import Ingredient from '../models/Ingredient.js';
import app from '../app.js';
import { db, closeDb } from '../db.js';

describe('GET /ingredients', () => {
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
    await Ingredient.deleteMany();
  });

  test('should return status 200', async () => {
    const { statusCode } = await request(app).get('/ingredients');

    expect(statusCode).toBe(200);
  });

  test('should return two ingredients', async () => {
    const ingredients = [{ name: 'Ingredient 1' }, { name: 'Ingredient 2' }];

    ingredients.forEach(async ingredients => {
      await Ingredient.create(ingredients);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const { statusCode, body } = await request(app).get('/ingredients');

    expect(statusCode).toBe(200);
    expect(body.length).toBe(2);
  });
});
