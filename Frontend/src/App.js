import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Sent from "./pages/Sent";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";
import Inbox from "./pages/Inbox";
import CreateLetter from "./pages/CreateLetter";
import Letters from "./pages/Dashboard/Letters";
import Users from "./pages/Dashboard/Users";
import DashboardInbox from "./pages/Dashboard/DashboardInbox";
import DashboardSent from "./pages/Dashboard/DashboardSent";
import Account from "./components/Account";
import Password from "./components/Password";
import UserProfile from "./pages/Dashboard/UserProfile";
import UserCreate from "./pages/Dashboard/UserCreate";
import LetterCreate from "./pages/Dashboard/LetterCreate";
import LetterEdit from "./pages/Dashboard/LetterEdit";
import SentEdit from "./pages/Dashboard/SentEdit";
import SentDetail from "./pages/Dashboard/SentDetail";
import Report from "./pages/Dashboard/Report";

const App = () => {
    return (
        <React.Fragment>
            <Routes>
                <Route path={"/"} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={"/profile"} element={<Profile />}>
                        <Route index element={<Account />} />
                        <Route path={"password"} element={<Password />} />
                    </Route>
                    <Route path={"/sent"} element={<Sent />}/>
                    <Route path={"/inbox"} element={<Inbox />}/>
                    <Route path={"/new"} element={<CreateLetter />} />
                </Route>
                <Route path={"/dashboard"} element={<Dashboard />}>
                    <Route index element={<DashboardInbox />}/>
                    <Route path={"sent"} element={<DashboardSent />} />
                    <Route path={"sent/:id"} element={<SentDetail />} />
                    <Route path={"sent/edit/:id"} element={<SentEdit />} />
                    <Route path={"letters"} element={<Letters />} />
                    <Route path={"letters/create"} element={<LetterCreate />} />
                    <Route path={"letters/:id"} element={<LetterEdit />} />
                    <Route path={"users"} element={<Users />} />
                    <Route path={"users/:id"} element={<UserProfile />} />
                    <Route path={"users/create"} element={<UserCreate />} />
                    <Route path={"report"} element={<Report />} />
                </Route>
                <Route path={"/login"} element={<Login />}/>
                <Route path={"/register"} element={<Register />}/>
                <Route path={"/*"} element={<NotFound />} />
            </Routes>
        </React.Fragment>
    );
};

export default App;
