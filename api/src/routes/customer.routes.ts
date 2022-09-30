import {
  deleteCustomer,
  findCustomerById,
  findCustomers,
  updateCustomer,
} from "./../controllers/customer.controller";
import {
  createCustomerSchema,
  customerIdParam,
  updateCustomerSchema,
} from "./../schemas/customer.schema";
import express from "express";
import validateRequest from "../middlewares/validateRequest";
import { createCustomer } from "../controllers/customer.controller";

const router = express.Router();

router.post("", [validateRequest(createCustomerSchema)], createCustomer);

router.patch(
  "/:customerId",
  [validateRequest(updateCustomerSchema)],
  updateCustomer
);

router.delete(
  `/:customerId`,
  [validateRequest(customerIdParam)],
  deleteCustomer
);

router.get("/:customerId", findCustomerById);

router.get("", findCustomers);

export default router;
