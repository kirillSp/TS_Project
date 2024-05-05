import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField } from "../GlobalComponent/FormControl/FormsControl";
import { requiredField, maxLengthCreator } from "../../Util/Validate/Validate";
import { connect, useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../Redux/authReducer";
import { Navigate } from "react-router-dom";
import messageError from "../GlobalComponent/FormControl/FormControlS.module.css";
import { RootReducersType } from "../../Redux/Redux__store";

type TPLogin = {}

let maxLength30 = maxLengthCreator(30);

export const Login: FC<TPLogin> = (props) => {
    let isAuth = useSelector((state: RootReducersType) => state.auth.isAuth);
    let captchaUrl = useSelector((state: RootReducersType) => state.auth.captchaUrl);

    let dispatch = useDispatch();

    const sendForm = (formData: any) => {
        dispatch( login(formData.login, formData.password, formData.remmemberMe, formData.captcha) );
    }

    if (isAuth) return <Navigate to={"/profile"} />

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={sendForm} captchaUrl={captchaUrl} />
    </div>
}

type LoginFormOwnPropsType = { 
    captchaUrl: string | undefined 
};

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string | undefined
};

type PropsDataType = Extract<keyof FormDataType, string>;

let LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {createField<PropsDataType>("login", Input, "login", [requiredField, maxLength30])}
        {createField<PropsDataType>("password", Input, "password", [requiredField, maxLength30], { type: "password" })}
        {createField<PropsDataType>("rememberMe", Input, undefined, [], { type: "checkbox" }, "remember me")}
        {props.error && <div className={messageError.wrongData}>{props.error}</div>}
        {props.captchaUrl && <img src={props.captchaUrl} />}
        {props.captchaUrl && createField<PropsDataType>("captcha", Input, "captcha", [])}
        <div>
            <button>Login</button>
        </div>
    </form>
};

let LoginReduxForm = reduxForm<FormDataType, LoginFormOwnPropsType>({ form: 'loginUser' })(LoginForm);