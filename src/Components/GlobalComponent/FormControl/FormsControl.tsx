import React from "react";
import FormCotrolS from "./FormControlS.module.css";

import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { ValidateField } from "../../../Util/Validate/Validate";

export const TextArea: React.FC<WrappedFieldProps> = (props) => {
    let { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...restProps} {...input} /></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = (props) => {
    let { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...restProps} {...input} /></FormControl>
};

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
};

const FormControl: React.FC<FormControlPropsType> = ({ meta, children }) => {
    let { error, touched } = meta;
    let { formsControl, errorS } = FormCotrolS;
    let checkForms = error && touched;

    return <div className={formsControl + " " + (checkForms && errorS)}>
        <div>{children}</div>
        <div>{
            checkForms && <span>{error}</span>
        }</div>
    </div>
};


export function createField<PropsDataType extends string>(name: PropsDataType, component: React.FC<WrappedFieldProps>, placeholder: string | undefined, validate: Array<ValidateField>, typeInput = {}, text = "") {
    return <div>
        <Field name={name} component={component} placeholder={placeholder} validate={validate} {...typeInput} />{text}
    </div>
};