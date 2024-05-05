import { TPostData, TProfile, actions } from "../../../../Redux/profileReducer";
import { connect } from "react-redux";
import ProfilePosts from "./ProfilePosts";
import { RootReducersType } from "../../../../Redux/Redux__store";

export type TDispatchToProps = {
	updatePost: (formDAta: string) => void
}


export type TMapStateToProps = {
	postsData: Array<TPostData>
	profile: TProfile | null
} 


let mapStateToProps = (state: RootReducersType) => {
	return {
		postsData: state.profilePage.postsData,
		profile: state.profilePage.profile,
	}
};

const ProfilePostsContainer = connect
	<TMapStateToProps, TDispatchToProps, {}, RootReducersType>
	(mapStateToProps, { updatePost: (formData: string) => actions.addPostAC(formData) })
	(ProfilePosts);

export default ProfilePostsContainer;