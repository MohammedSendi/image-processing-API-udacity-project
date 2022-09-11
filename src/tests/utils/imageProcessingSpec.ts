import fs from 'fs/promises';
import path from 'path';
import sizeOf from 'image-size';
import { createThumbnail } from '../../utils/imageProcessing';
describe('Image Processing', () => {
  it('created a thumb version of the image with the correct height and width', async () => {
    await createThumbnail('encenadaport', 50, 50).then(() => {
      const dimensions = sizeOf(
        path.resolve(__dirname, '../../../assets/thumb/encenadaport-50x50.jpg')
      );
      expect(dimensions.height).toEqual(50);
      expect(dimensions.width).toEqual(50);
    });
  });
  it('returns 404 message when files does not exist', async () => {
    await createThumbnail('randomName', 50, 50).catch((error) => {
      expect(error.status).toBe(404);
    });
  });
});
