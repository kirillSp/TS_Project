import { compose } from "redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { initinalApp } from "./Redux/appReducer";
import HeaderContainer from "./Components/header/headerContainer";
import Navigation from "./Components/nav/nav";
import News from "./Components/nav/News/News"
import Music from "./Components/nav/Music/music"
import Settings from "./Components/nav/Settings/Settings";
import { Login } from "./Components/Login/Login";
import Preloader from "./Components/GlobalComponent/Preloader/Preloader";
import { RootReducersType } from "./Redux/Redux__store";
import { UsersPage } from "./Components/nav/FindUsers/UsersPage";
import { Box, Grid } from "@mui/material";
import { gridAside, gridContainer, gridFooter, gridHeader, gridMain } from "./SApp";

import React, { ComponentType, FC, Suspense, useEffect} from "react";
import { ChatPage } from "./Pages/ChatPage";
// _____________________________________________________________________________________________

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = { initinalApp: () => void }

let ProfileContainer = React.lazy(() => import("./Components/nav/Profile/ProfileContainer"));
let DialogsContainer = React.lazy(() => import("./Components/nav/Dialogs/DialogsContainer"));
// let UsersPage = React.lazy(() => import("./Components/nav/FindUsers/UsersPage"));



export const NewApp = () => {
    let dispatch = useDispatch();
    let isAuth = useSelector((state: RootReducersType) => {
        return state.appReducer.initialized;
    });

    useEffect(() => {
        dispatch( initinalApp() );
    }, []);
    
    if (!isAuth) return <Preloader />

    return <Grid container sx={gridContainer}>
        <Grid item xs={12} sx={gridHeader}>
            <HeaderContainer />
        </Grid>
        <Grid item xs={2} sx={gridAside}>
            <Navigation />
        </Grid>
        <Grid item xs={10} sx={gridMain}>
            <div className="message-wrapper">
                <Suspense fallback={<div>Login</div>}>
                    <Routes>
                        <Route path="/profile/" element={<ProfileContainer />}></Route>
                        <Route path="/profile/:userId" element={<ProfileContainer />}></Route>
                        <Route path="/dialogs/*" element={<DialogsContainer />}></Route>
                        <Route path="/music" element={<Music />}></Route>
                        <Route path="/news" element={<News />}></Route>
                        <Route path="/settings" element={<Settings />}></Route>
                        <Route path="/findUsers" element={<UsersPage pageTitle={"samurai"} />}></Route>
                        <Route path="/chatpages" element={<ChatPage />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="*" element={<div>404 not found</div>}></Route>
                    </Routes>
                </Suspense>
            </div>
        </Grid>
        <Grid item xs={12} sx={gridFooter}>footer</Grid>
    </Grid>
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
    // catchAllUnhandlerError() {
    //     alert("some error")
    // }

    componentDidMount() {
        this.props.initinalApp();
        // window.addEventListener("unhandledrejection", this.catchAllUnhandlerError);
    }

    // componentWillUnmount() {
    // window.removeEventListener("unhandledrejection", this.catchAllUnhandlerError);
    // }

    render() {
        if (!this.props.initialized) return <Preloader />

        return <div>
            <div className="app-wrapper">
                <HeaderContainer />
                <Navigation />
                <div className="message-wrapper">
                    <Suspense fallback={<div>Login</div>}>
                        <Routes>
                            <Route path="/profile/" element={<ProfileContainer />}></Route>
                            <Route path="/profile/:userId" element={<ProfileContainer />}></Route>
                            <Route path="/dialogs/*" element={<DialogsContainer />}></Route>
                            <Route path="/music" element={<Music />}></Route>
                            <Route path="/news" element={<News />}></Route>
                            <Route path="/settings" element={<Settings />}></Route>
                            <Route path="/findUsers" element={<UsersPage pageTitle={"samurai"} />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="*" element={<div>404 not found</div>}></Route>
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>

    }
}

let mapStateToProps = (state: RootReducersType) => ({ initialized: state.appReducer.initialized });
export default connect(mapStateToProps, { initinalApp })(App);

