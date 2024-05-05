// import ProfileStatus from "./ProfileStatus/ProfileStatus";

import React, { ChangeEvent, FC, useState } from "react";
import Preloader from "../../../GlobalComponent/Preloader/Preloader";
import S from "./ProfileInfoS.module.css";
import ProfileData from "./ProfileData/ProfileData"
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import { TPropsProfile } from "../Profile";
import { TProfile } from "../../../../Redux/profileReducer";



const ProfileInfo: FC<TPropsProfile> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let { profile, updateImgProfile, isParamId, status, updateStatus } = props;
    
    if (!profile) return <Preloader />

    let selectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            updateImgProfile(e.target.files[0]);}
    }

    let sendUpdatedProfileInfo = (formData: TProfile) => {
        // remove then
        props.updateDataProfile(formData).then(() => setEditMode(!editMode));
    };

    return (
        <div className={S.posts}>
            {/* <ProfileStatus status={props.status || "Укажите статус"} updateStatus={props.updateStatus}/> */}

            <div>
                <img className={S.profileImg} src={profile.photos.small || "https://pbs.twimg.com/media/EaEDOYFU4AUCbH3.jpg"} />
            </div>
            <div>{
                isParamId || <input type="file" onChange={selectPhoto} />
            }</div>
            <>{editMode
                ? <ProfileDataReduxForm profile={profile} onSubmit={sendUpdatedProfileInfo} updateStatus={updateStatus} />
                : <ProfileData profile={profile} status={status} updateStatus={updateStatus} isParamId={isParamId} setEditMode={() => setEditMode(!editMode)} />
            }</>

            <div>
                <b>Status: </b>
                <ProfileStatusWithHooks status={props.status || "Укажите статус"} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;