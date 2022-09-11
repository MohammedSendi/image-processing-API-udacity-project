import supertest from 'supertest';
import fs from 'fs/promises';
import path from 'path';
import app from '../../index';
import { Stats } from 'fs';
import sizeOf from 'image-size';

const request = supertest(app);
describe('GET /api/images', () => {
  it('responds with 400 if called without parameters', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });

  it('responds with 400 if called with a missing parameter', async () => {
    const response = await request.get('/api/images?filename=test&height=100');
    expect(response.status).toBe(400);
  });

  it('responds with 404 if called correctly but image does not exist', async () => {
    const response = await request.get(
      '/api/images?filename=test&height=100&width=100'
    );
    expect(response.status).toBe(404);
  });

  it('responds with 200 if called correctly and image exist', async () => {
    const response = await request.get(
      '/api/images?filename=encenadaport&height=100&width=100'
    );
    expect(response.status).toBe(200);
  });

  it('created a thumb version of the image', async () => {
    await request
      .get('/api/images?filename=encenadaport&height=100&width=100')
      .then(() => {
        fs.stat(
          path.resolve(
            __dirname,
            '../../../assets/thumb/encenadaport-100x100.jpg'
          )
        ).then((fileStat: Stats) => expect(fileStat).not.toBeNull());
      });
  });
  it('created a thumb version of the image with the correct height and width', async () => {
    await request
      .get('/api/images?filename=encenadaport&height=200&width=150')
      .then(() => {
        const dimensions = sizeOf(
          path.resolve(
            __dirname,
            '../../../assets/thumb/encenadaport-200x150.jpg'
          )
        );
        expect(dimensions.height).toEqual(200);
        expect(dimensions.width).toEqual(150);
      });
  });
});
