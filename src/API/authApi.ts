import { instance } from "./API";
import { ResponseDataType } from "./API";

type AuthType = {
    id: number
    email: string
    login: string
};

type LoginType = {
    userId: number
};

export const authAPI = {
    auth() {
        return instance.get<ResponseDataType<AuthType>>("auth/me").then(response => response.data);
    },

    login(email: string, password: string, remmemberMe = false, captcha: undefined | string = undefined) {
        return instance.post<ResponseDataType<LoginType>>("auth/login", { email, password, remmemberMe, captcha }).then(response => response.data);
    },

    logout() {
        return instance.delete("auth/login").then(response => response.data);
    }
};