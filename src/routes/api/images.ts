import express, { Request, Response } from 'express';
import { Stats } from 'fs';
import fs from 'fs/promises';
import sharp from 'sharp';

const images: express.Router = express.Router();

export interface ImageQuery {
  filename?: string;
  width?: number;
  height?: number;
}

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const image: ImageQuery = {
    filename: req.query.filename as string,
    width: parseInt(req.query.width as string),
    height: parseInt(req.query.height as string),
  };

  // check if the query is correct
  if (!image.filename || !image.height || !image.width) {
    res
      .status(400)
      .send('Please provide correct filename, height and width params');
    return;
  }

  const thumbPath = `assets/thumb/${image.filename}-${image.height}x${image.width}.jpg`;
  const fullPath = `assets/full/${image.filename}.jpg`;

  //does file exist?
  const fullImage: Stats | null = await fs.stat(fullPath).catch(() => {
    res.status(404).send('Image does not exist');
    return null;
  });

  if (!fullImage) {
    return;
  }

  //does thumb exist?
  const existingThumb: Stats | null = await fs.stat(thumbPath).catch(() => {
    return null;
  });

  //show thumb
  if (existingThumb) {
    fs.readFile(thumbPath)
      .then((thumbData: Buffer) => {
        res.status(200).contentType('jpg').send(thumbData);
      })
      .catch(() => {
        res.status(500).send('Error occured processing the image');
      });
  } else {
    // resize image
    const imageBuffer: Buffer | null = await sharp(fullPath)
      .resize(image.width, image.height)
      .toBuffer()
      .catch(() => null);

    if (!imageBuffer) {
      return Promise.reject();
    }

    //save new image
    fs.writeFile(thumbPath, imageBuffer)
      .then(() => {
        fs.readFile(thumbPath).then((thumbData: Buffer) => {
          res.status(200).contentType('jpg').send(thumbData);
        });
        return imageBuffer;
      })
      .catch(() => {
        return Promise.reject();
      });
  }
});

export default images;

//http://localhost:3000/api/images?filename=encenadaport&width=500&height=500
