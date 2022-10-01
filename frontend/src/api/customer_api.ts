import { axiosInstance } from "./../config/axios_instance";
import { Dispatch } from "@reduxjs/toolkit";
import { updateCustomers } from "../context/customerSlice";
import { Customer } from "../models/customer.model";

export const fetch_today_birthday_customers = async (dispatch: Dispatch) => {
  const res = await axiosInstance.get(`/customer/today/birthday`);

  const customers: Customer[] = res.data.listResult;

  if (customers.length) {
    dispatch(updateCustomers(customers));
  }
};
