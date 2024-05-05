import React, { FC } from "react";
import { ContactsType, TProfile } from "../../../../../Redux/profileReducer";

type TProfileData = {
    profile: TProfile
    status: string
    isParamId: boolean
    updateStatus: (status: string) => Promise<void>
    setEditMode: () => void
}

let ProfileData: FC<TProfileData> = (props) => {
    let { profile, isParamId, setEditMode } = props;

    return <div>
        <div>{
            isParamId || <button onClick={setEditMode}>EditMode</button>
        }</div>

        <div>
            <b>Full name:</b>
            <span>{profile.fullName}</span>
        </div>
        <div>
            <b>About me:</b>
            <span>{profile.aboutMe}</span>
        </div>

        <div>
            <b>Looking for job:</b>
            <span>{profile.lookingForAJob ? "Yes" : "No"}</span>
        </div>

        <div>
            <b>My Professional skills:</b>
            <span>{profile.lookingForAJobDescription}</span>
        </div>

        <div>
            <b>Contacts:</b>
            <span>{
                Object
                    .keys(profile.contacts)
                    .map(key => <Contact key={key} contactProp={key} contactVal={profile.contacts[key as keyof ContactsType]} />)
            }</span>
        </div>
    </div>
};

type TContact = {
    contactProp: string
    contactVal: string | null
}

export let Contact: FC<TContact> = ({ contactProp, contactVal }) => {
    return <div>
        <b>{contactProp}</b>
        <span>{contactVal}</span>
    </div>
};

export default ProfileData;