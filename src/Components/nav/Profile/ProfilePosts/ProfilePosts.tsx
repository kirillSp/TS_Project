import React, { FC } from "react";
import ProfileListPosts from "./ProfileListPosts/ProfileListPosts";
import ProfileReduxPostsForm, { TFormData } from "./ProfilePostsForm/ProfilePostsForm";
import { TDispatchToProps, TMapStateToProps } from "./ProfilePostsContainer";

const ProfilePosts: FC<TMapStateToProps & TDispatchToProps> = (props) => {
    const sendPost = (formData: TFormData) => {
        props.updatePost(formData.profileMessage)
    };

    return <main>
        <ProfileReduxPostsForm onSubmit={sendPost} />
        <ProfileListPosts postsData={props.postsData} />
    </main>
};

export default ProfilePosts;