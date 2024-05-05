import React, { FC } from "react";
import S from "./ProfileListPostsS.module.css";
import { TPostData } from "../../../../../Redux/profileReducer";



type TProfileListPosts = {
    postsData: Array<TPostData>
} 

const ProfileListPosts: FC<TProfileListPosts> = (props ) => {
    let getPostsData = props.postsData.map((el, i) => {
        return <div key={i} className={S.item}>
            <img src={el.path} />
            <span>{el.message}</span>
            <div>
                <span>{el.likesCount}</span>
            </div>
        </div>
    });

    return <>{getPostsData}</>;
}

export default ProfileListPosts;
