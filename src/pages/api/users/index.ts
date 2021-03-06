import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import dbConnect from 'backend/dbConnect';
import User from 'backend/models/user';

const handler = nextConnect();

handler.get<NextApiRequest, NextApiResponse>(async (_, res) => {
  try {
    await dbConnect();

    const users = await User.find({});

    return res.status(200).json(JSON.parse(JSON.stringify(users)));
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Unexpected internal server error.' });
  }
});

export default handler;
