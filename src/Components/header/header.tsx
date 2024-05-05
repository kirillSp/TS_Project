import React, {FC} from "react";
import H from "./header.module.css";
import { NavLink } from "react-router-dom";
import { TDispatchProps, TMapStateProps } from "./headerContainer";

const Header: FC<TMapStateProps & TDispatchProps> = (props) => {
    return <header className={H.header}>
        <img src="#" />
        <div className="LoginHeader">{
            props.auth.isAuth
                ? <div>{props.auth.email} <button onClick={props.logout}>Log out</button></div>
                : <NavLink to={"/login"}>Login</NavLink>

        }</div>
    </header>
}

export default Header;