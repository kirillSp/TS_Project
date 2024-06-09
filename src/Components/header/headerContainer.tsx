import React from "react";
import Header from "./header";
import { connect } from "react-redux";
import { initinalState, logout } from "../../Redux/authReducer";
import { RootReducersType } from "../../Redux/Redux__store";

export type TMapStateProps = {
    auth: typeof initinalState
}

export type TDispatchProps = {
    logout: () => void
}

class HeaderContainer extends React.Component<TMapStateProps & TDispatchProps> {
    render() {
        return <Header {...this.props} />;
    }
}

let mapStateToProps = (state: RootReducersType) => ({ auth: state.auth });
export default connect<TMapStateProps, TDispatchProps, {}, RootReducersType>(mapStateToProps, { logout })(HeaderContainer);