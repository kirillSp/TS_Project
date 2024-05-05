import { ResultCodeEnum } from "../API/API";
import { securityAPI } from "../API/securityApi";
import { authAPI } from "../API/authApi";
import { stopSubmit } from "redux-form";
import { CommonThunkType, PropertiesType } from "./Redux__store";

type InitialStateType = typeof initinalState;
type GetActionsTypes = PropertiesType<typeof actions>;
type ThunkType = CommonThunkType<GetActionsTypes | ReturnType<typeof stopSubmit>>;

export let initinalState = {
    id: null as null | number,
    login: null as null | string,
    email: null as null | string,
    isAuth: false as boolean,
    captchaUrl: undefined as undefined | string
};

let authReducer = (state = initinalState, action: GetActionsTypes): InitialStateType => {
    switch (action.type) {
        case "AUTH-USER":
            return {
                ...state,
                ...action.getDataAuth,
            }

        case "GET-CAPTCHA-URL-SUCCESS":
            return {
                ...state,
                captchaUrl: action.payload
            }

        default:
            return state;
    };
};

export let authUser = (): ThunkType => async (dispatch) => {
    let response = await authAPI.auth();

    if (!response.resultCode) {
        let { id, login, email } = response.data;
        dispatch(actions.authAC(id, login, email, true));
    }

};

export const login = (login: string, password: string, remmemberMe: boolean, captcha: undefined | string = undefined): ThunkType => async (dispatch) => {
    let response = await authAPI.login(login, password, remmemberMe, captcha);
    if (response.resultCode === ResultCodeEnum.success) {
        dispatch(authUser());
    } else {
        if (response.resultCode === ResultCodeEnum.error) dispatch(getCaptchaUrl())
        let responseMessage = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit("loginUser", { _error: responseMessage }));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptcha();

    dispatch(actions.getCaptchaUrlSuccess(response.url));
};

export const logout = (): ThunkType => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.resultCode === 0) {
        dispatch(actions.authAC(null, null, null, false));
    }
}

const actions = {
    authAC: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({ type: "AUTH-USER", getDataAuth: { id, login, email, isAuth } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({ type: "GET-CAPTCHA-URL-SUCCESS", payload: captchaUrl } as const)
};

export default authReducer;