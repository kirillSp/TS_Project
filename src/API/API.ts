import axios from "axios";
import { UsersType } from "../Redux/findUsersReducer";

export let instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {
        "API-KEY": "2affb19e-3c29-41dc-8c86-f9da87d4bf78"
    }

});

export const enum ResultCodeEnum { success = 0, error = 1, }
export const enum ResultCodeCaptchaEnum { captchaIsRequired = 10, }

export type ResponseDataType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
};

export type GetItemsType = {
    items: Array<UsersType>
    name: string | null
    totalCount: number
};
