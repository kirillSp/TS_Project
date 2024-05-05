import React, { FC } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { UsersType } from "../../../../Redux/findUsersReducer";

type PT = {
    users: Array<UsersType>
    followingInProgress: Array<number>
    follow: (id: number) => void
    unfollow: (id: number) => void
}

export let ListUsers: FC<PT> = (props) => {
    let { users, followingInProgress, follow, unfollow } = props;

    return <div>{
        users.map(user => {
            let photoUser = user.photos.small;
            let isDisabled = followingInProgress.some(id => id === user.id);

            return <li key={user.id}>
                <NavLink to={"/Profile/" + user.id}>
                    <img className="wolfRed" src={photoUser || "https://pbs.twimg.com/media/EaEDOYFU4AUCbH3.jpg"} />
                </NavLink>

                <p>{user.name}</p>
                <p>{user.id}</p>

                <div>{
                    user.followed
                        ? <button disabled={isDisabled} onClick={() => follow(user.id)}>UNFOLLOW</button>
                        : <button disabled={isDisabled} onClick={() => unfollow(user.id)}>FOLLOW</button>
                }</div>
            </li>

        })
    }</div>
}