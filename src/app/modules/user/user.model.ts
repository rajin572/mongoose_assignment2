import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullname,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';
import config from '../../config';

const FullnameSchema = new Schema<TFullname>({
  firstName: { type: String },
  lastName: { type: String },
});

const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const UserSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: {
    type: FullnameSchema,
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String], default: [] },
  address: {
    type: AddressSchema,
  },
  orders: [{ type: OrderSchema }],
});

// Use to hash password
UserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//Use to not included password field
UserSchema.set('toJSON', {
  transform: function (doc, upDate) {
    delete upDate.password;
    return upDate;
  },
});

// Use To Field Filtering to get All User data
UserSchema.pre('find', function (next) {
  this.find({}).projection({
    _id: 0,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  next();
});

UserSchema.pre('findOneAndUpdate', function (next) {
  this.find({}).projection({
    orders: 0,
  });
  next();
});

UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

export const User = model<TUser, UserModel>('User', UserSchema);
