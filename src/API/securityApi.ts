import { instance } from "./API";

type getCaptchaType = {
    url: string
}

export const securityAPI = {
    getCaptcha() {
        return instance.get<getCaptchaType>("security/get-captcha-url").then(response => response.data);
    }
};