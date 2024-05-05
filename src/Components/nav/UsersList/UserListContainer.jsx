import { connect } from "react-redux";
import UsersList from "./UsersList";

let mapStateToProps = state => {
    return {sideBar: state.sidebarPage}
};

const UsersListContainer = connect(mapStateToProps)(UsersList);
export default UsersListContainer;