import React, { FC } from "react"
import { TextArea } from "../../../../GlobalComponent/FormControl/FormsControl";
import { requiredField, maxLengthCreator } from "../../../../../Util/Validate/Validate";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField } from "../../../../GlobalComponent/FormControl/FormsControl";

export type TFormData = {
    profileMessage: string
}

type TOwnProps = {}
type CheckDataForm = Extract<keyof TFormData, string>;

const maxLength10 = maxLengthCreator(10)

let ProfilePostsForm: FC<InjectedFormProps<TFormData, TOwnProps>> = (props) => {
    
    return <form onSubmit={props.handleSubmit}>
        <h1>My Post</h1>
        <>{ createField<CheckDataForm>("profileMessage", TextArea, "Input message",  [requiredField, maxLength10]) }</>
        <br />
        <button>Button</button>
    </form>
}

export default reduxForm<TFormData, TOwnProps>({ form: "profileForm" })(ProfilePostsForm);