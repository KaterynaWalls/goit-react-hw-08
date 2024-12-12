import { NavLink } from "react-router-dom";
import s from "./AuthNav.module.css";

const AuthNav = () => {
  return (
  
        <div className={s.authNavCon}>
      <NavLink to="/register" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : s.link}>
        Register
      </NavLink>
      <NavLink to="/login" className={({ isActive }) => isActive ? `${s.link} ${s.active}` : s.link}>
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;


