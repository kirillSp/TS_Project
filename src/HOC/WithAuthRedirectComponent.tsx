import React, { ComponentType, FC } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootReducersType } from "../Redux/Redux__store";

let mapStateToPropsForRedirect = (state: RootReducersType) => ({ auth: state.auth.isAuth });
type MapStateType = ReturnType<typeof mapStateToPropsForRedirect>
type TPropsRedirectComponentType = {}

export function WithAuthRedirectComponent<P extends object>(Component: ComponentType<P>) {
    let RedirectComponent: FC<MapStateType> = (props) => {
        let { auth, ...restProps } = props;

        if (!props.auth) return <Navigate to={"/login"} />

        return <Component { ...restProps as P } />

    }

    let redirectComponent = connect<MapStateType, null, {}, RootReducersType>(mapStateToPropsForRedirect, null)(RedirectComponent);
    return redirectComponent;
};
