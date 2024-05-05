import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from 'redux-form'
import { createField, Input, TextArea } from "../../../../GlobalComponent/FormControl/FormsControl";
import { requiredField, maxLengthCreator } from "../../../../../Util/Validate/Validate";
import {  TProfile } from "../../../../../Redux/profileReducer";

type TPropsProfileDataForm = {
    profile: TProfile
    updateStatus: (status: string) => Promise<void>
}

const maxLength10 = maxLengthCreator(10)

let ProfileDataForm: FC<InjectedFormProps<TProfile, TPropsProfileDataForm> & TPropsProfileDataForm> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <button>save</button>
            {props.error && <div style={{ color: "red" }}>{props.error}</div>}

        </div>

        <div>
            <b>Full name:</b>
            <span>{createField("fullName", Input, "full name", [requiredField, maxLength10])}</span>
        </div>

        <div>
            <b>About me</b>
            <span>{createField("aboutMe", TextArea, "about me", [requiredField])}</span>
        </div>

        <div>
            <b>Looking for job:</b>
            <span>{createField("lookingForAJob", Input, undefined, [], { type: "checkbox" }, undefined)}</span>
        </div>

        <div>
            <b>My Professional skills:</b>
            <span>{createField("lookingForAJobDescription", TextArea, "Скиллы", [requiredField])}</span>
        </div>

        <div>
            <b>Contacts:</b>
            <span>{
                Object
                    .keys(props.profile)
                    .map(key => {
                        return <div key={key}>
                            <b>{key}</b>
                            <span>{createField("contacts." + key, Input, key, [])}</span>
                        </div>
                    })
            }</span>
        </div>
    </form>
}

export default reduxForm<TProfile, TPropsProfileDataForm>({ form: "ProfileDataForm" })(ProfileDataForm);