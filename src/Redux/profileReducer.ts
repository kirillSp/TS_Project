import { stopSubmit } from "redux-form";
import { profileAPI } from "../API/profileApi";
import { PhotoType } from "../types/types";
import { CommonThunkType, PropertiesType } from "./Redux__store";

type InitialStateType = typeof initialState;
type GetActionsType = PropertiesType<typeof actions>;
type ThunkType = CommonThunkType<GetActionsType | ReturnType<typeof stopSubmit>>;

export type TPostData = {
    id: number
    message: string
    likesCount: number
    path: string
};

export type ContactsType = {
    skype: string | null
    vk: string | null
    facebook: string | null
    icq: string | null 
    email: string | null
    googlePlus: string | null
    twitter: string | null
    instagram: string | null
    whatsApp: string | null

};

export type TProfile = {
    aboutMe: string | null
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number | null
    photos: PhotoType
};

let initialState = {
    postsData: [
        { id: 1, message: "Post 1", likesCount: 10, path: "http://www.clker.com/cliparts/R/S/Z/4/t/f/crossed-hammers-bw-100x100-md.png" },
        { id: 1, message: "Post 2", likesCount: 5, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjpT0a-IGi_4HMzlGEbc0Vd9WQCj6i2EMqg&usqp=CAU" },
        { id: 1, message: "Post 3", likesCount: 100, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSr2BXBAn41QkNQkwtxwr4vMLR7NytIIxHwCejVT5OhIFmxqyJA2o4Qxa43CJqL6Uiuv0&usqp=CAU" },
        { id: 1, message: "Post 4", likesCount: 30, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Zu7qrFjoQ_WmGjqTNz-CVZrljJnxbmrFGS7Vx-62zerLxMrKI6lMG0mWMgcu9nb5I_8&usqp=CAU" },
    ] as Array<TPostData>,

    profile: null as TProfile | null,
    status: "",
};


const profileReducer = (state = initialState, action: GetActionsType): InitialStateType => {
    switch (action.type) {
        case "ADD-POST":
            return {
                ...state,
                // message: action.formData.profileMessage
                postsData: [...state.postsData, { id: 1, message: action.formData, likesCount: 10, path: "http://www.clker.com/cliparts/R/S/Z/4/t/f/crossed-hammers-bw-100x100-md.png" }],
            };

        case "SET-USER":
            return {
                ...state,
                profile: action.getDataProfile
            };

        case "SET-STATUS":
            return {
                ...state,
                status: action.getStatus
            };

        case "SET-PHOTO":
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: { ...state.profile, ...action.photo }
                } as TProfile
            }

        default:
            return state;
    }
};

export const dataProfile = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.profile(userId)
    dispatch(actions.setUserProfile(response));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
};

export const updateImgProfile = (photo: File): ThunkType => async (dispatch) => {
    let response = await profileAPI.sendPhoto(photo);

    if (response.resultCode === 0) {
        dispatch(actions.setPhotoAC(response.data.photos));
    }
};

export const updateDataProfile = (data: TProfile): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.id;
    let response = await profileAPI.sendUpdatedDataProfile(data);
    if (response.resultCode === 0) {
        if (userId === null) {
            throw new Error("userId can't be null");
        } else {
            dispatch(dataProfile(userId));
        }
    } else {
        dispatch(stopSubmit("ProfileDataForm", { _error: response.messages[0] }));
        return Promise.reject(response.messages[0]);
    }
}

export const actions = {
    addPostAC: (formData: string) => ({ type: "ADD-POST", formData } as const),
    setUserProfile: (getDataProfile: TProfile) => ({ type: "SET-USER", getDataProfile } as const),
    setStatus: (getStatus: string) => ({ type: "SET-STATUS", getStatus } as const),
    setPhotoAC: (photo: PhotoType) => ({ type: "SET-PHOTO", photo } as const)
};

export default profileReducer; 