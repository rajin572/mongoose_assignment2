import { Request, Response } from 'express';
import { OrderValidationSchema, UserValidationSchema } from './user.validation';
import { UserService } from './user.services';

// Create User
const createUserController = async (req: Request, res: Response) => {
  try {
    const userData = await req.body;

    const zodParseData = UserValidationSchema.parse(userData);
    const result = await UserService.createUserService(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User is created unsuccesfull',
      error: error,
    });
  }
};

// Get All User
const getUserController = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUserService();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Users fetched unsuccesfull',
      error: error,
    });
  }
};

//Get User By Id
const getUserByIDController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getUserByIDService(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User fetched unsuccesfull',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Update User By Id
const updateUserByIDController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = await req.body;

    const result = await UserService.updateUserByIDService(
      Number(userId),
      userData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User updated unsuccesfull',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Delete User By Id
const deleteUserByIDController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await UserService.deleteUserByIDService(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User deleted unsuccesfull',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Get All Order For User
const createOrderForUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = await req.body;

    const zodParseData = OrderValidationSchema.parse(orderData);

    await UserService.createOrderForUserService(Number(userId), zodParseData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Order created unsuccesfull',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// Get Total Price
const getAllOrdersForUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getAllOrdersForUserService(Number(userId));

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch orders for user',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getTotalPriceOfOrdersForUserController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.params;

    const result = await UserService.getTotalPriceOfOrdersForUserService(
      Number(userId),
    );

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result[0].totalPrice,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to calculate total price',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserController = {
  createUserController,
  getUserController,
  getUserByIDController,
  updateUserByIDController,
  deleteUserByIDController,
  createOrderForUserController,
  getAllOrdersForUserController,
  getTotalPriceOfOrdersForUserController,
};
