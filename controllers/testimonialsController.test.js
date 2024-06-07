import request from 'supertest';
import Testimonial from '../models/Testimonial.js';
import app from '../app.js';
import { db, closeDb } from '../db.js';

describe('GET /testimonials', () => {
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
    await Testimonial.deleteMany();
  });

  test('should return status 200', async () => {
    const { statusCode } = await request(app).get('/testimonials');

    expect(statusCode).toBe(200);
  });

  test('should return two testimonials', async () => {
    const testimonials = [{ name: 'Testimonial 1' }, { name: 'Testimonial 2' }];

    testimonials.forEach(async testimonial => {
      await Testimonial.create(testimonial);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const { statusCode, body } = await request(app).get('/testimonials');

    expect(statusCode).toBe(200);
    expect(body.length).toBe(2);
  });
});
