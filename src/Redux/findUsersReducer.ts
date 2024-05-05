import { ResponseDataType, ResultCodeEnum } from "../API/API";
import { usersAPI } from "../API/userApi";
import { updateStateButton } from "../Util/WrapperReducer/WrapperReducer";
import { PhotoType } from "../types/types";
import { CommonThunkType } from "./Redux__store";
import { Dispatch } from "redux";
import { PropertiesType } from "./Redux__store";

export type UsersType = {
    id: number,
    name: string,
    status: string,
    followed: boolean,
    photos: PhotoType
};

export type initialStateType = typeof initialState;
type GetActionTypes = PropertiesType<typeof actions>;
type ThunkType = CommonThunkType<GetActionTypes>;
export type TFilter = typeof initialState.filter;

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 3,
    totalUsers: 40,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>,
    filter: {
        term: "",
        friend: null as null | boolean
    }
};

let findUsersReducer = (state = initialState, action: GetActionTypes): initialStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateStateButton(state.users, action.userId, 'id', { followed: false }),
            };

        case "UNFOLLOW":
            return {
                ...state,
                users: updateStateButton(state.users, action.userId, 'id', { followed: true })
            };

        case "SET-USERS":
            return { ...state, users: action.getUsers.map((item: any) => item) }; // Problem!!

        case "CURRENT-PAGE":
            return { ...state, currentPage: action.numPage };

        case "TOGGLE-IS-LOADING":
            return { ...state, isLoading: action.getToggleLoading }

        case "TOGGLE-IN-PROGRESS":
            return {
                ...state,
                followingInProgress: action.toggleInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(users => users !== action.userId)
            };
        case "FIND-USER/SET-FILTER":
            return {
                ...state, filter: action.payload   
            }
        default:
            return state
    }
};

export let getDataUsers = (currentPage: number, pageSize: number, filter: TFilter): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsLoadingAC(true));

    dispatch(actions.currentPageAC(currentPage));
    dispatch(actions.setFilterAC(filter));

    let response = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsLoadingAC(false));
    dispatch(actions.setStateAC(response.items));
};

let followUnfollowFlow = async (dispatch: Dispatch<GetActionTypes>, id: number, responseToggle: (id: number) => Promise<ResponseDataType>, getToggleAC: (id: number) => GetActionTypes) => {
    dispatch(actions.toggleInProgress(true, id));
    let response = await responseToggle(id);

    if (response.resultCode === ResultCodeEnum.success) dispatch(getToggleAC(id));
    dispatch(actions.toggleInProgress(false, id));
}

export const follow = (id: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.followAC);
};

export const unfollow = (id: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollowAC);
};

export const actions = {
    followAC: (userId: number) => ({ type: "FOLLOW", userId } as const),
    unfollowAC: (userId: number) => ({ type: "UNFOLLOW", userId } as const),
    setFilterAC: (filter: TFilter) => ({ type: "FIND-USER/SET-FILTER", payload: filter } as const),
    setStateAC: (getUsers: Array<UsersType>) => ({ type: "SET-USERS", getUsers } as const),
    currentPageAC: (numPage: number) => ({ type: "CURRENT-PAGE", numPage } as const),
    toggleIsLoadingAC: (getToggleLoading: boolean) => ({ type: "TOGGLE-IS-LOADING", getToggleLoading } as const),
    toggleInProgress: (toggleInProgress: boolean, userId: number) => ({ type: "TOGGLE-IN-PROGRESS", toggleInProgress, userId } as const),
};

export default findUsersReducer;