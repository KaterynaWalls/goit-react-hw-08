import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import { Toaster } from "react-hot-toast";
import s from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={s.layout}>
      <AppBar />
      <Toaster position="top-right" reverseOrder={false} />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
