import S from "./Dialogs.module.css"
import UsersDialog from "./UsersDialog/UsersDialog";
import Messages from "./Messages/Messages";
import { InjectedFormProps, reduxForm } from "redux-form";
import { requiredField, maxLengthCreator } from "../../../Util/Validate/Validate"
import { initialStateType } from "../../../Redux/messageReducer";
import { createField } from "../../GlobalComponent/FormControl/FormsControl";
import { TextArea } from "../../GlobalComponent/FormControl/FormsControl";

type PropsType = {
    messagePage: initialStateType
    addPost: (formData: string) => void
}

type FormDataType = {
    dialogMessageForm: string
}

const maxLength10 = maxLengthCreator(10); 

const Dialogs: React.FC<PropsType> = (props) => {
    let sendMessage = (formData: { dialogMessageForm: string }) => {
        return props.addPost(formData.dialogMessageForm);
    }
    let userNameMessage = props.messagePage.dialogsData.map((d, i) => <UsersDialog key={i} name={d.name} id={d.id} />);
    let userDialogs = props.messagePage.messagesData.map((item, i) => <Messages key={i} message={item.message} />)

    return (
        <div className={S.dialogs}>
            <div className={S.dialogsItems}>
                <p>Names</p>
                <div>{userNameMessage}</div>
            </div>
            <div className={S.messages}>
                <p>Messages</p>
                <DialogsReduxForm onSubmit={sendMessage} />
                <div>{userDialogs}</div>
            </div>
        </div>
    )   
}

const DialogsForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return <form onSubmit={props.handleSubmit}>
        {createField<"dialogMessageForm">("dialogMessageForm", TextArea, "Введите сообщение", [requiredField, maxLength10])}
        <button>onClick</button>
    </form>
}

const DialogsReduxForm = reduxForm<FormDataType>({ form: "message" })(DialogsForm);

export default Dialogs;