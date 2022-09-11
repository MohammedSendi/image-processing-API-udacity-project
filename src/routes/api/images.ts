import express, { Request, Response } from 'express';
import { Stats } from 'fs';
import fs from 'fs/promises';
import sharp from 'sharp';
import { buffer } from 'stream/consumers';
import { createThumbnail, ImageQuery } from '../../utils/imageProcessing';
const images: express.Router = express.Router();

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const image: ImageQuery = {
    filename: req.query.filename as string,
    width: parseInt(req.query.width as string),
    height: parseInt(req.query.height as string)
  };

  // check if the query is correct
  if (!image.filename || !image.height || !image.width) {
    console.error('Please provide correct filename, height and width params');
    res
      .status(400)
      .send('Please provide correct filename, height and width params');
    return;
  }

  const buffer = await createThumbnail(
    image.filename,
    image.height,
    image.width
  )
    .then((buffer) => {
      res.status(200).contentType('jpg').send(buffer);
    })
    .catch((error) => {
      res.status(error.status).send(error.message);
    });
});

export default images;
