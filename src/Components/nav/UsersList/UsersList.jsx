import UsersListS from "./UsersList.module.css"

const UsersList = props => {
    return (
        <div>
            {props.sideBar.map((item, i) => 
                <li className={UsersListS.navBarProfile} key={i}>
                    <a href="#">
                        <img src={item.src} />
                        <div>{item.name}</div>
                    </a>
                </li>
            )}
        </div>
    )
}

export default UsersList;