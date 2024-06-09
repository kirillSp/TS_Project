import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { TDispatchProps, TMapStateProps } from "./headerContainer";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import FitbitIcon from '@mui/icons-material/Fitbit';
import { useDispatch, useSelector } from "react-redux";
import { RootReducersType } from "../../Redux/Redux__store";
import { logout } from "../../Redux/authReducer";

const Header: FC<TMapStateProps & TDispatchProps> = (props) => {
    let isAuth = useSelector((state: RootReducersType) => state.auth.isAuth);
    let email = useSelector((state: RootReducersType) => state.auth.email);
    let dispatch = useDispatch();

    const handlerLogout = () => {
        dispatch(logout())
    }

    const SStack = {
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 10px",
    };
    const STextTitleLogo = {
        color: "white"
    }

    const SHeaderEmail = {
        color: "white"
    }

    const SLoginNavLink = {
        display: "block", 
        background: "#1565C0", 
        padding: "10px 20px", 
        borderRadius: "4px",
        color: "white",
        textDecoration: "none"
    }

    return <header>
        <Stack direction="row" sx={SStack}>
            <Stack direction="row" spacing={1} alignItems="center">
                <FitbitIcon color="warning" />
                <Typography variant="h5" component="span" sx={STextTitleLogo}>Title site</Typography>
            </Stack>
            <Box>{
                isAuth
                    ? <Stack direction="row" spacing={2} alignItems="center">
                        <Typography sx={SHeaderEmail} variant="body1" component="span">{email}</Typography>
                        <Button variant="contained" onClick={handlerLogout}>Log out</Button>
                    </Stack>
                    : <NavLink style={SLoginNavLink} to={"/login"}>Login</NavLink>
            }</Box>
        </Stack>
    </header>
}

export default Header;