import { type NextApiRequest, type NextApiResponse } from "next";
import { Readable } from "stream";
import { prisma } from "~/server/db";
import { filerepo } from "~/server/repos/FileRepo";
import { type Files, formidable, type Fields } from 'formidable';
import type IncomingForm from "formidable/Formidable";

export default async function handler(req: NextApiRequest, res: NextApiResponse<object>) {

  const opts = {
    uploadDir: '/public/images',
    keepExtensions: true,
    maxFileSize: 5*1024*1024 // 5 mb
  };

  const form: IncomingForm = formidable(opts);
  const promise: Promise<{fields: Fields, files: Files}> = new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files: Files) => {
      if (error) {
        reject(error);
      }
      resolve({fields, files});
    });
  });

  const {fields, files} = await promise;
  console.log(files.files);

  res.status(200).json({file: files.files});// { path, picture };
  return;


  const path = await filerepo.create( Readable.from(Buffer.from('asdffdsa')));

  const picture = await prisma.picture.create({
      data: {
          fullSizePath: path,
          thumbnailPath: path,
          title: path.slice(-1),
          location: 'USA'
      }
  });
  res.status(200).json({path, picture});// { path, picture };
}

export const config = {
  api: {
    bodyParser: false//{ sizeLimit: '4mb' }
  }
}