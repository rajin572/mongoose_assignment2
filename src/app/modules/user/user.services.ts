import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// Create User
const createUserService = async (userData: TUser) => {
  const result = await User.create(userData);

  return result;
};

// Get All User
const getUserService = async () => {
  const result = await User.find();
  return result;
};

// Get User By Id
const getUserByIDService = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId });
    return result;
  } else {
    throw new Error('User not found');
  }
};

// Update User Information
const updateUserByIDService = async (
  userId: number,
  updatedUserData: TUser,
) => {
  if (await User.isUserExists(userId)) {
    const result = User.findOneAndUpdate({ userId: userId }, updatedUserData, {
      new: true,
    });
    return result;
  } else {
    throw new Error('User not found');
  }
};

// Delet User
const deleteUserByIDService = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = User.deleteOne({ userId });
    return result;
  } else {
    throw new Error('User not found');
  }
};

// Create Order For User
const createOrderForUserService = async (userId: number, order: TOrder) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: order } },
      { new: true },
    );
    return result;
  } else {
    throw new Error('User not found');
  }
};

// Get All Order For User
const getAllOrdersForUserService = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const userData = await User.findOne({ userId });
    return {
      orders: userData?.orders || [],
    };
  } else {
    throw new Error('User not found');
  }
};

// Get Total Price
const getTotalPriceOfOrdersForUserService = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.aggregate([
      { $match: { userId } },
      { $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
    ]);
    return result;
  } else {
    throw new Error('User not found');
  }
};

export const UserService = {
  createUserService,
  getUserService,
  getUserByIDService,
  updateUserByIDService,
  deleteUserByIDService,
  createOrderForUserService,
  getAllOrdersForUserService,
  getTotalPriceOfOrdersForUserService,
};
