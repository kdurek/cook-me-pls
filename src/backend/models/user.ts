import mongoose, { Model } from 'mongoose';

export interface IUser {
  _id: string;
  email?: string;
  image?: string;
  name?: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    image: { type: String },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const User: Model<IUser> =
  mongoose.models.User || mongoose.model('User', userSchema);

export default User;
