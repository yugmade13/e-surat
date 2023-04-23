import React, {useEffect, useState} from "react";
import {GetMe} from "../features/authSlice";
import {Outlet, useNavigate} from "react-router-dom"
import style from "../style";
import Navbar from "../components/Navbar";
import {useDispatch, useSelector} from "react-redux";

const Layout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isError} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(GetMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [navigate, isError]);


    return (
        <div className={"bg-primary w-full overflow-hidden"}>
            <div className={`${style.paddingX} ${style.flexCenter}`}>
                <div className={`${style.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;
