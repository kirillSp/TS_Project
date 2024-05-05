import { PropertiesType } from "./Redux__store";

export type initialStateType = typeof initialState;
type ActionsTypes = PropertiesType<typeof actions>;

type DialogsType = { id: number, name: string };
type MessageType = { id: number, message: string };

let initialState = {
    dialogsData: [
        { id: 1, name: "Kirill" },
        { id: 2, name: "Dima" },
        { id: 3, name: "Ivan" },
        { id: 4, name: "Oleg" },
        { id: 5, name: "Artem" },
        { id: 6, name: "Misha" },
    ] as Array<DialogsType>,
    messagesData: [
        { id: 1, message: "How are you?" },
        { id: 2, message: "Fine" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo, Hello" },

    ] as Array<MessageType>
};


const messageReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case "DIALOGS/ADD-MESSAGE-POST": {
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 1, message: action.formData }],
            };
        }
        default:
            return state;
    }
}

export const actions = {
    addMessagePostAC: (formData: string) => ({ type: "DIALOGS/ADD-MESSAGE-POST", formData } as const),
}

export default messageReducer;