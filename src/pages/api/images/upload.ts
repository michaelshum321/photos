import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "~/server/db";
import { filerepo } from "~/server/repos/FileRepo";
import { type Files, formidable, type Fields, type File } from 'formidable';
import type IncomingForm from "formidable/Formidable";
import { type Options } from "formidable";
import exifr from "exifr";
import sharp from 'sharp';

export default async function handler(req: NextApiRequest, res: NextApiResponse<object>) {


  /*
  Get Image blob - Writable!
  * Get Exif
  * Convert to Jpeg
  * Resize
  * Send Raw and Resized to file repo
  * get paths, save to DB
  Send  off to filerepo
  */
  const opts: Options = {
    uploadDir: './public/images',
    keepExtensions: true,
    maxFileSize: 5*1024*1024 // 5 mb,
  };

  const form: IncomingForm = formidable(opts);
  const promise: Promise<{fields: Fields, files: Files}> = new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
      }
      resolve({fields, files});
    });
  });
  const file = (await promise).files.files as File;

  const filepath = file.filepath;
  console.log('filepath', filepath);
  const rawImagePromise = filerepo.read(filepath);

  const getExif = async function(buffer: Buffer) {
    return (await exifr.parse(buffer, true)) as Promise<object>;
  }

  const convertToJpeg = function(buffer: Buffer) : Promise<Buffer> {
    return sharp(buffer)
      .jpeg({ quality: 100 })
      .toBuffer();
  }

  const resize = async function(buffer: Buffer) : Promise<Buffer> {
    const image = sharp(buffer);
    const metadata = await image.metadata();
    const width = metadata.width as number;
    const height = metadata.height as number;
    const resized = width >= height ? image.resize(512) : image.resize(null, 512);
    return resized.toBuffer();
  }

  // 1. getExif
  // 2. convertToJpeg, get raw jepg -> resize jpeg -> [rawJpeg, resizeJpeg]

  const exifObject = await rawImagePromise.then(getExif);
  const fullJpegPromise = rawImagePromise.then(convertToJpeg);
  const resizedJpeg = await fullJpegPromise.then(resize);
  const fullJpeg = await fullJpegPromise;

  const fullJpegPath = await filerepo.create(fullJpeg, '.jpg');
  const resizedJpegPath = await filerepo.create(resizedJpeg, '.jpg');

  const split = fullJpegPath.split('/');
  const title = split[split.length-1] as string;
  const picture = await prisma.picture.create({
    data: {
        fullSizePath: fullJpegPath,
        thumbnailPath: resizedJpegPath,
        title: title,
        location: 'USA',
        exif: JSON.stringify(exifObject)
    }
  });

  res.redirect('/images/'+picture.id);
}

export const config = {
  api: {
    bodyParser: false//{ sizeLimit: '4mb' }
  }
}