import { object, string, array, ref, boolean, mixed, number, date } from "yup";

const customerId = {
  params: object({
    customerId: string().required(),
  }),
};

const payload = {
  body: object({
    name: string(),
    birthday: date(),
    gender: mixed().oneOf(["MALE", "FEMALE"]),
    address: string(),
    phoneNumber: string(),
    favoriteItems: array().of(string()),
  }),
};

export const createCustomerSchema = object({
  body: object({
    name: string().required(),
    birthday: date().required(),
    gender: mixed().oneOf(["MALE", "FEMALE"]),
    address: string().required(),
    phoneNumber: string().required(),
    favoriteItems: array().of(string()).min(1),
  }),
});

export const updateCustomerSchema = object({
  ...customerId,
  ...payload,
});

export const customerIdParam = object({ ...customerId });
