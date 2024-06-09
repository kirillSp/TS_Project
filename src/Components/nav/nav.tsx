import React from "react";
import UsersListContainer from "./UsersList/UserListContainer";
import { NavLink } from "react-router-dom";
import L from "./nav.module.css";

const setActive = ({ isActive }) => isActive ? L.active : "";
const Navigation = () => {
  return (
    <nav className={L.nav}>
      <ul>
        <li className={L.item}><NavLink to="/profile" className={setActive}>Profile</NavLink></li>
        <li className={L.item}><NavLink to="/dialogs" className={setActive}>Message</NavLink></li>
        <li className={L.item}><NavLink to="/news" className={setActive}>News</NavLink></li>
        <li className={L.item}><NavLink to="/music" className={setActive}>Music</NavLink></li>
        <li className={L.item}><NavLink to="/settings" className={setActive}>Settings</NavLink></li>
        <li className={L.item}><NavLink to="/findUsers" className={setActive}>Find Users</NavLink></li>
        <li className={L.item}><NavLink to="/chatpages" className={setActive}>Chat Pages</NavLink></li>
      </ul>
      <ul className={L.friends}>
        <h2>Friends</h2>
        <UsersListContainer />
      </ul>
    </nav>
  )
} 

export default Navigation;