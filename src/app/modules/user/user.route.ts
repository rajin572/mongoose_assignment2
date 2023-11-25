import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUserController);
router.get('/', UserController.getUserController);
router.get('/:userId', UserController.getUserByIDController);
router.put('/:userId', UserController.updateUserByIDController);
router.delete('/:userId', UserController.deleteUserByIDController);
router.put('/:userId/orders', UserController.createOrderForUserController);
router.get('/:userId/orders', UserController.getAllOrdersForUserController);
router.get(
  '/:userId/orders/total-price',
  UserController.getTotalPriceOfOrdersForUserController,
);

export const UserRoutes = router;
