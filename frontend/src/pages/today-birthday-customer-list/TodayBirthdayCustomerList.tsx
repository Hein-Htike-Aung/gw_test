import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import StyledButton from "../../components/form/StyledButton";
import { RootState } from "../../context/store";
import { useAppSelector } from "../../hooks/useAppSelector";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./today-birthday-customer-list.scss";

const TodayBirthdayCustomerList = () => {
  const navigate = useNavigate();

  const { customers: birthdayCustomers } = useAppSelector(
    (state: RootState) => state.customers
  );

  return (
    <div className="todayBirthdayCustomerList">
      <h1 className="title">Today Birthday Customers</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Favorite Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {birthdayCustomers.map((c, idx) => (
              <TableRow
                key={idx}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{c.name}</TableCell>
                <TableCell>
                  {new Date(c.birthday).toLocaleDateString()}
                </TableCell>
                <TableCell>{c.gender}</TableCell>
                <TableCell>{c.address}</TableCell>
                <TableCell>{c.phoneNumber}</TableCell>
                <TableCell>{c.favoriteItems}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledButton
        type="text"
        onClick={() => navigate("/", { replace: true })}
      >
        <ArrowBackIcon /> Customer List
      </StyledButton>
    </div>
  );
};

export default TodayBirthdayCustomerList;
