import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import formidable from 'formidable';
import nextConnect from 'next-connect';

import dbConnect from '@/backend/mongoose';
import protect from '@/backend/middleware/protect';
import Recipe from '@/backend/models/recipe';
import { IUser } from '@/backend/models/user';

interface NextApiRequestExtended extends NextApiRequest {
  user: IUser;
}

const handler = nextConnect();

handler.patch<NextApiRequestExtended, NextApiResponse>(
  protect(),
  async (req, res) => {
    try {
      const { user } = req;

      const form = formidable({
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024,
      });

      const parsedForm = await new Promise((resolve, reject) => {
        form.parse(req, (parseError, fields, files) => {
          if (parseError) {
            reject(parseError);
            return res.status(400).json({
              message: 'There was an error uploading image',
              error: parseError,
            });
          }

          return resolve({ fields, files });
        });
      });

      const {
        files,
        fields: { _id: recipeId },
      } = parsedForm;

      const currentRecipe = await Recipe.findById(recipeId);

      if (user._id.toString() !== currentRecipe.author.toString()) {
        return res
          .status(403)
          .send(
            'Your account is not authorized to access the requested resource.'
          );
      }

      const uploadResult = await cloudinary.v2.uploader.upload(
        files.image.path,
        {
          folder: 'cook-me-pls',
          public_id: recipeId,
          width: 1500,
        },
        async (uploadError, result) => {
          if (uploadError) {
            return res.status(400).json({
              message: 'There was an error uploading image',
              error: uploadError,
            });
          }
          return result;
        }
      );

      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        { image: uploadResult.secure_url },
        {
          new: true,
        }
      );

      return res.status(200).json(updatedRecipe);
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Unexpected internal server error.' });
    }
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default dbConnect(handler);