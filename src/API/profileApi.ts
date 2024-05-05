import { instance } from "./API";
import { ProfileType } from "../Redux/profileReducer";
import { ResponseDataType } from "./API";
import { PhotoType } from "../types/types";

type PhotoPropsType = {
    photos: PhotoType
}

export const profileAPI = {
    profile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data);
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data);
    },

    updateStatus(status: string) {
        return instance.put<ResponseDataType>(`profile/status`, { status });
    },

    sendPhoto(photo: any) {
        const formData = new FormData();
        formData.append("image", photo);

        return instance.put<ResponseDataType<PhotoPropsType>>('profile/photo', formData, { 
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => response.data);
    },

    sendUpdatedDataProfile(data: ProfileType) {
        return instance.put<ResponseDataType>("profile", data).then(response => response.data);
    }
};