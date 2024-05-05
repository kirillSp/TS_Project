import { createSelector } from "reselect";
import { RootReducersType } from "./Redux__store";

export const getUsersSelector = (state: RootReducersType) => {
    return state.findUsers.users;
}
export const getUsers = createSelector(getUsersSelector, (userList) => {
    return userList.filter(i => true);
});

export const getPageSize = (state: RootReducersType) => state.findUsers.pageSize;
export const getTotalUsers = (state: RootReducersType) => state.findUsers.totalUsers;
export const getPage = (state: RootReducersType) => state.findUsers.currentPage;
export const getIsLoading = (state: RootReducersType) =>  state.findUsers.isLoading;
export const getfollowingInProgress = (state: RootReducersType) =>  state.findUsers.followingInProgress;
export const getFilter = (state: RootReducersType) => state.findUsers.filter;