import React, { FC } from "react";
import { FindUsers } from "./FindUsers";

type TPFindUsersPage = {
    pageTitle: string
};

export const UsersPage: FC<TPFindUsersPage> = (props) => {
    return <FindUsers />
};