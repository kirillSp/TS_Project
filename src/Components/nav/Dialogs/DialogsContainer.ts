import Dialogs from "./Dialogs";
import { actions } from "../../../Redux/messageReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirectComponent } from "../../../HOC/WithAuthRedirectComponent";
import { RootReducersType } from "../../../Redux/Redux__store";
import { ComponentType } from "react";

let mapStateToProps = (state: RootReducersType) => ({ messagePage: state.messagePage });

export default compose<ComponentType>(
    connect(mapStateToProps, { addPost: actions.addMessagePostAC }),
    WithAuthRedirectComponent
)(Dialogs);