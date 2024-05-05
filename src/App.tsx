// import { compose } from "redux";
// import React, { ComponentType, FC, Suspense } from "react";
// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import { connect } from "react-redux";
// import { initinalApp } from "./Redux/appReducer";

// import HeaderContainer from "./Components/header/headerContainer";
// import Navigation from "./Components/nav/nav";
// import News from "./Components/nav/News/News"
// import Music from "./Components/nav/Music/music"
// import Settings from "./Components/nav/Settings/Settings";
// import { Login } from "./Components/Login/Login";
// import Preloader from "./Components/GlobalComponent/Preloader/Preloader";
// import { RootReducersType } from "./Redux/Redux__store";
// import { UsersPage } from "./Components/nav/FindUsers/UsersPage";

// type MapPropsType = ReturnType<typeof mapStateToProps>;
// type DispatchPropsType = { initinalApp: () => void }

// let ProfileContainer = React.lazy(() => import("./Components/nav/Profile/ProfileContainer"));
// let DialogsContainer = React.lazy(() => import("./Components/nav/Dialogs/DialogsContainer"));
// // let UsersPage = React.lazy(() => import("./Components/nav/FindUsers/UsersPage"));

// class App extends React.Component<MapPropsType & DispatchPropsType> {
//     // catchAllUnhandlerError() {
//     //     alert("some error")
//     // }

//     componentDidMount() {
//         this.props.initinalApp();
//         // window.addEventListener("unhandledrejection", this.catchAllUnhandlerError);
//     }

//     // componentWillUnmount() {
//     // window.removeEventListener("unhandledrejection", this.catchAllUnhandlerError);
//     // }

//     render() {
//         if (!this.props.initialized) return <Preloader />

//         return <div>
//             <div className="app-wrapper">
//                 <HeaderContainer />
//                 <Navigation />
//                 <div className="message-wrapper">
//                     <Suspense fallback={<div>Login</div>}>
//                         <Routes>
//                             <Route path="/profile/" element={<ProfileContainer />}></Route>
//                             <Route path="/profile/:userId" element={<ProfileContainer />}></Route>
//                             <Route path="/dialogs/*" element={<DialogsContainer />}></Route>
//                             <Route path="/music" element={<Music />}></Route>
//                             <Route path="/news" element={<News />}></Route>
//                             <Route path="/settings" element={<Settings />}></Route>
//                             <Route path="/findUsers" element={<UsersPage pageTitle={"samurai"} />}></Route>
//                             <Route path="/login" element={<Login />}></Route>
//                             <Route path="*" element={<div>404 not found</div>}></Route>
//                         </Routes>
//                     </Suspense>
//                 </div>
//             </div>
//         </div>

//     }
// }

// let mapStateToProps = (state: RootReducersType) => ({ initialized: state.appReducer.initialized });
// export default connect(mapStateToProps, { initinalApp })(App);

import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;