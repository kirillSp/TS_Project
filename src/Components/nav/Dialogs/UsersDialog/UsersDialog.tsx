import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import S from "./UsersDialogs.module.css";

type TProps = {
	name: string
	id: number
}

const UsersDialog: FC<TProps> = (props) => {
	return (
		<div>
			<NavLink to={`/dialogs/${props.id}`} className={ ({ isActive }) => isActive ? S.active : "" }>{props.name}</NavLink>
		</div>
	)
};

export default UsersDialog;