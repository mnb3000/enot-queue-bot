import Jimp from 'jimp';
import appRoot from 'app-root-dir';
import bot from '../bot';

export default async function sendIdPicture(userId: number, uniqueId: number) {
  const image = await new Jimp(640, 360, '#FFE4C4');
  const font = await Jimp.loadFont(`${appRoot.get()}/assets/fonts/Montserrat.fnt`);
  const height = (image.bitmap.height / 2) - (font.common.lineHeight / 2);
  image.print(
    font,
    0,
    height,
    {
      text: uniqueId.toString(),
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    },
    image.bitmap.width,
  );
  const imageBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
  await bot.sendPhoto(userId, imageBuffer);
}
