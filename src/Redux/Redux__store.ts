import { createStore, combineReducers, applyMiddleware } from "redux";

import profilePage from "./profileReducer";
import messagePage from "./messageReducer";
import sidebarPage from "./sidebarReducer";
import findUsers from "./findUsersReducer";
import auth from "./authReducer";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./appReducer";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

let rootReducers = combineReducers({ profilePage, messagePage, sidebarPage, findUsers, auth, appReducer, form: formReducer });
let store = createStore(rootReducers, applyMiddleware(thunk));

export type RootReducersType = ReturnType<typeof rootReducers> 
export type PropertiesType<T> = T extends { [key: string]: (...args: any) => infer U } ? U : never;
export type CommonThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootReducersType, unknown, A>;

export default store;