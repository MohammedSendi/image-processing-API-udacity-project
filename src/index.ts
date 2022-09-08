import routes from './routes';
//import File from './file';
import express, { Request, Response } from 'express';

const app: express.Application = express();
const port: number = 3000; // Default port

// Add routes
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send(
    `<h1>Welcome to image-processing-api</h1><p>please visit <a href="/api">/api</a> to test `
  );
});
// Start server
app.listen(port);

export default app;
