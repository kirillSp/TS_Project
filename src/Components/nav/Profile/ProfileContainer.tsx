import React, { ComponentType, FC } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { dataProfile, getStatus, updateStatus, updateImgProfile, updateDataProfile, TProfile } from "../../../Redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WithAuthRedirectComponent } from "../../../HOC/WithAuthRedirectComponent";
import { compose } from "redux";
import { RootReducersType } from "../../../Redux/Redux__store";

type TMapStateToProps = ReturnType<typeof mapStateToProps>
type TMapDispatchToProps = {
    dataProfile: (userId: number | null) => Promise<void>
    getStatus: (status: number | null) => Promise<void>
    updateStatus: (status: string) => Promise<void>
    updateImgProfile: (photo: File) => Promise<void>
    updateDataProfile: (data: TProfile) => Promise<void>
}

type TRouter = {
    router: {
        params: { userId: string | boolean }
        navigate: ReturnType<typeof useNavigate>
        location: ReturnType<typeof useLocation>
    }
}

type TProps = TMapStateToProps & TMapDispatchToProps & TRouter;

function withRouter<P>(Component: ComponentType<P>) {
    type TOwnPropsProfileContainer = P

    let ComponentWithRouterProp = (props: TOwnPropsProfileContainer) => {
        let params = useParams();
        let location = useLocation();
        let navigate = useNavigate();
        let router = {params, location, navigate};

        return <Component {...props as P } router={ router }/>
        
    }

    return ComponentWithRouterProp;
}


class ProfileContainer extends React.Component<TProps> {
    profileUpdate() {
        let userId: number | null = +this.props.router.params.userId;
       
        if (!userId) {
            userId = this.props.myId;
        }

        this.props.dataProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.profileUpdate();
    }

    componentDidUpdate(prevProps: TProps) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.profileUpdate();
        }
    }

    render() {
        return <>
            <Profile profile={this.props.profile}
                status={this.props.status} 
                isParamId={!!this.props.router.params.userId} 
                updateImgProfile={this.props.updateImgProfile} 
                updateStatus={this.props.updateStatus} 
                updateDataProfile={this.props.updateDataProfile}
            />
        </>
    }

}

let mapStateToProps = (state: RootReducersType) => { 
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        myId: state.auth.id,
        auth: state.auth.isAuth  
    } 
};

export default compose<ComponentType>(
    connect(mapStateToProps, { dataProfile, getStatus, updateStatus, updateImgProfile, updateDataProfile }),
    withRouter,
    WithAuthRedirectComponent
)(ProfileContainer);