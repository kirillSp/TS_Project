import { instance, GetItemsType, ResponseDataType } from "./API";
import { TFilter } from "../Redux/findUsersReducer";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string, friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}${friend === null ? "" : `&friend=${friend}`}${friend === null ? "" : `&friend=${friend}`}`).then(response => response.data);
    },

    follow(id: number) {
        return instance.delete<ResponseDataType>(`follow/${id}`).then(response => response.data);
    },

    unfollow(id: number) {
        return instance.post<ResponseDataType>(`follow/${id}`).then(response => response.data);
    },

};