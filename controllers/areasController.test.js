import request from 'supertest';
import Area from '../models/Area.js';
import app from '../app.js';
import { db, closeDb } from '../db.js';

describe('GET /areas', () => {
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
    await Area.deleteMany();
  });

  test('should return status 200', async () => {
    const { statusCode } = await request(app).get('/areas');

    expect(statusCode).toBe(200);
  });

  test('should return two areas', async () => {
    const areas = [{ name: 'Area 1' }, { name: 'Area 2' }];

    areas.forEach(async area => {
      await Area.create(area);
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    const { statusCode, body } = await request(app).get('/areas');

    expect(statusCode).toBe(200);
    expect(body.length).toBe(2);
  });
});
