import { Formik, Field, Form } from "formik";
import { TFilter } from "../../../../Redux/findUsersReducer";
import * as Yup from "yup";

type TPFilterField = {
    filter: TFilter,
    onFilterChanged: (filter: TFilter) => void
}

type TInitialValues = {
    term: string,
    friend: string
}

type TFilterData = {
    term: string,
    friend: boolean | null
}

export const FilterField = (props: TPFilterField) => {
    const initialValues: TInitialValues = {
        term: props.filter.term,
        friend: `${props.filter.friend}`
    };

    const validationSchema = Yup.object({
        // term: Yup.string().required("Required!"),
    });

    const onSubmit = async (values: TInitialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void } ) => {
        let parseValues: TFilterData = {
            ...values, friend: JSON.parse(values.friend), 
        }

        props.onFilterChanged(parseValues);
        setSubmitting(false)
    };

    return <div>
        <h1>Any place in your app!</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize={true}>{
            (props) => {
                return <Form>
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={props.isSubmitting}>Submit</button>
                </Form>
            }
        }</Formik>
    </div>
}

