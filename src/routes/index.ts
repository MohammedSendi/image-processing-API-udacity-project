import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.use('/images', images);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    // This could be done by serving views ... Just quick and dirty for now :-)
    response.send(
      '<h1>Welcome to image-processing-api</h1><p>Listening at <code><a href="/api/images">/api/images</a></code></p><p>Examples:<ul><li><a href="/api/images?filename=encenadaport">/api/images?filename=encenadaport</a></li><li><a href="/api/images?filename=encenadaport&width=100&height=100">/api/images?filename=encenadaport&width=100&height=100</a></li></ul></p>'
    );
  }
);

export default routes;
