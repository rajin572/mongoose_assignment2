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
  firstName: { type: String, required: [true, 'First Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});

const AddressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'street Name is required'],
  },
  city: {
    type: String,
    required: [true, 'city Name is required'],
  },
  country: {
    type: String,
    required: [true, 'country Name is required'],
  },
});

const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product Name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const UserSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'UserId is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  password: { type: String, required: [true, 'Password is required'] },
  fullName: {
    type: FullnameSchema,
    required: [true, 'Full Name is required'],
  },
  age: { type: Number, required: [true, 'Age is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String], default: [] },
  address: {
    type: AddressSchema,
    required: [true, 'Address is required'],
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

//static method
UserSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

export const User = model<TUser, UserModel>('User', UserSchema);
