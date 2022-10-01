import { useEffect, useRef } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { fetch_today_birthday_customers } from "./api/customer_api";
import "./assets/app.scss";
import Topbar from "./components/layouts/topbar/Topbar";
import { useAppDispatch } from "./hooks/useAppSelector";
import CustomerList from "./pages/customer-list/CustomerList";
import TodayBirthdayCustomerList from "./pages/today-birthday-customer-list/TodayBirthdayCustomerList";

const App = () => {
  const dispatchRef = useRef(useAppDispatch());

  useEffect(() => {
    fetch_today_birthday_customers(dispatchRef.current);
  }, []);

  const Layout = () => {
    return (
      <>
        <Topbar />
        <div className="appContainer">
          <Outlet />
        </div>
      </>
    );
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<CustomerList />} />
        <Route
          path="/today-birthday-customer-list"
          element={<TodayBirthdayCustomerList />}
        />
      </Route>
    </Routes>
  );
};

export default App;
