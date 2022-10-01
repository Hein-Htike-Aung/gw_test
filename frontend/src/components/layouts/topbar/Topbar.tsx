import NotificationsIcon from "@mui/icons-material/Notifications";
import { Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../context/store";
import { useAppSelector } from "../../../hooks/useAppSelector";
import "./topbar.scss";

const Topbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/today-birthday-customer-list", { replace: true });
  };

  const { customers: birthdayCustomers } = useAppSelector(
    (state: RootState) => state.customers
  );

  const MenuForBirthday = () => {
    if (birthdayCustomers.length > 1) {
      const others = birthdayCustomers.length - 1;
      return (
        <MenuItem onClick={handleClose}>
          {birthdayCustomers[0].name} and {others} others have birthdays today
        </MenuItem>
      );
    } else {
      return (
        <MenuItem onClick={handleClose}>
          {birthdayCustomers[0].name} has birthday today
        </MenuItem>
      );
    }
  };

  return (
    <div className="topbar">
      <h1 className="logo">GW Code_Test</h1>
      <div className="notification" onClick={handleClick}>
        <NotificationsIcon className="notiIcon" />
        {birthdayCustomers.length !== 0 && (
          <span className="notificationCount">{birthdayCustomers.length}</span>
        )}
      </div>
      {birthdayCustomers.length !== 0 && (
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuForBirthday />
        </Menu>
      )}
    </div>
  );
};

export default Topbar;
