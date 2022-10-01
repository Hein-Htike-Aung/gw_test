import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "../models/customer.model";

interface State {
  customers: Customer[] | null;
}

const initialState: State = {
  customers: [],
};

const customerSlice = createSlice({
  name: "today_birthday_customer",
  initialState,
  reducers: {
    updateCustomers: (state, action) => {
      state.customers = action.payload;
    },
  },
});

export const { updateCustomers } = customerSlice.actions;
export default customerSlice.reducer;
