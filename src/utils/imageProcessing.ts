import express, { Request, Response } from 'express';
import { Stats } from 'fs';
import fs from 'fs/promises';
import sharp from 'sharp';

export interface ImageQuery {
  filename?: string;
  width?: number;
  height?: number;
}
export const createThumbnail = async (
  filename: string,
  height: number,
  width: number
) => {
  const thumbPath = `assets/thumb/${filename}-${height}x${width}.jpg`;
  const fullPath = `assets/full/${filename}.jpg`;

  //does file exist?
  const fullImage: Stats | null = await fs.stat(fullPath).catch(() => {
    //res.status(404).send('');
    console.error('File does not exist');
    return Promise.reject({ status: 404, message: 'File does not exist' });
  });

  //does thumb exist?
  const existingThumb: Stats | null = await fs.stat(thumbPath).catch(() => {
    return null;
  });

  //show thumb
  if (existingThumb) {
    const buffer = fs
      .readFile(thumbPath)
      .then((thumbData: Buffer) => {
        return thumbData;
      })
      .catch(() => {
        console.error('Error occured processing the image');
        return Promise.reject({
          status: 500,
          message: 'Error occured processing the image'
        });
      });
    if (buffer) return buffer;
  } else {
    // resize image
    const imageBuffer: Buffer | null = await sharp(fullPath)
      .resize(width, height)
      .toBuffer()
      .catch(() => null);

    if (!imageBuffer) {
      console.error('Error occured processing the image');

      return Promise.reject({
        status: 500,
        message: 'Error occured processing the image'
      });
    }

    //save new image
    const buffer = fs
      .writeFile(thumbPath, imageBuffer)
      .then(() => {
        fs.readFile(thumbPath).then((thumbData: Buffer) => {
          return thumbData;
        });
        return imageBuffer;
      })
      .catch(() => {
        console.error('Error occured processing the image');
        return Promise.reject({
          status: 500,
          message: 'Error occured processing the image'
        });
      });
    if (buffer) return buffer;
  }
};
