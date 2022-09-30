import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Topbar from "./components/layouts/topbar/Topbar";
import CustomerList from "./pages/customer-list/CustomerList";
import './assets/app.scss';

const App = () => {
  const Layout = () => {
    return (
      <>
        <Topbar />
        <div className="wrapper">
          <Outlet />
        </div>
      </>
    );
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="" element={<CustomerList />} />
      </Route>
    </Routes>
  );
};

export default App;
