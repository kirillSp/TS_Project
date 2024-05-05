import { authUser } from "./authReducer";
import { PropertiesType, CommonThunkType } from "./Redux__store";

let initinalState = { initialized: false };
type initialStateType = typeof initinalState;
type GetActionsTypes = PropertiesType<typeof actions>;
type ThunkType = CommonThunkType<GetActionsTypes, undefined>;

let appReducer = (state = initinalState, action: GetActionsTypes): initialStateType => {
    switch (action.type) {
        case "SN/APP/INITIALIZED":
            return { ...state, initialized: true };
        default:
            return state;
    }
};

export let initinalApp = (): ThunkType  => (dispatch) => {
    let promise = dispatch(authUser());
    
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccessApp())
    });
};

let actions = {
    initializedSuccessApp: () => ({ type: "SN/APP/INITIALIZED", } as const),
};

export default appReducer;