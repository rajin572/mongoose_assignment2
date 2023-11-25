import { z } from 'zod';

const FullnameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const AddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

export const OrderValidationSchema = z?.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: FullnameValidationSchema,
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});
