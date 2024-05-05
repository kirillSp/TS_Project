import React, { FC } from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { TProfile } from "../../../Redux/profileReducer";
import ProfilePostsContainer from "./ProfilePosts/ProfilePostsContainer";
import { useParams } from "react-router-dom";

export type TPropsProfile = {
    profile: TProfile | null
    status: string
    isParamId: boolean
    updateStatus: (status: string) => Promise<void>
    updateImgProfile: (photo: File) => Promise<void>
    updateDataProfile: (data: TProfile) => Promise<void>
}

const Profile: FC<TPropsProfile> = (props) => {
    return <main>
        <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} updateImgProfile={props.updateImgProfile} isParamId={props.isParamId} updateDataProfile={props.updateDataProfile} />
        <ProfilePostsContainer />
    </main>

}

export default Profile;