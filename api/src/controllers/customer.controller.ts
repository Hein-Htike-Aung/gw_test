import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import Customer from "../models/cutomer.model";

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = new Customer({ ...req.body });

    const newCustomer = await customer.save();

    res.status(201).json(newCustomer);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerIdParam = get(req, "params.customerId");

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerIdParam,
      { $set: { ...req.body } },
      { new: true }
    );

    res.status(202).json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerIdParam = get(req, "params.customerId");

    await Customer.findByIdAndDelete(customerIdParam);

    res.status(202).json({ message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const findCustomerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerIdParam = get(req, "params.customerId");

    const customer = await Customer.findById(customerIdParam);

    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export const findCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const favoriteItem = req.query.favoriteItem;
    const month = req.query.month;
    const pageSize = req.query.pageSize;
    const page = req.query.page;

    let condition = {};

    if (month) {
      const [listResult, countResult] = await Promise.all([
        Customer.find({
          $expr: {
            $eq: [{ $month: "$birthday" }, month],
          },
        }),
        Customer.count(condition),
      ]);

      res.status(200).json({ listResult, countResult });
    }
    if (favoriteItem) {
      condition = {
        favoriteItems: favoriteItem,
      };

      const [listResult, countResult] = await Promise.all([
        Customer.find(condition),
        Customer.count(condition),
      ]);

      res.status(200).json({ listResult, countResult });
    } else {
      let _pageSize = Math.abs(+pageSize! || +process.env.PAGE_SIZE!);
      let _page = (Math.abs(+page!) || 1) - 1;

      const [listResult, countResult] = await Promise.all([
        Customer.find(condition)
          .sort({ _id: -1 })
          .limit(_pageSize)
          .skip(_pageSize * _page),
        Customer.count(condition),
      ]);

      res.status(200).json({ listResult, countResult });
    }
  } catch (error) {
    next(error);
  }
};


export const find_TodayBirthday_Customer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
}