import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom"
import styles from "../style";
import {navDashboard} from "../constant";
import {Back} from "../assets";
import {useDispatch, useSelector} from "react-redux";
import {GetMe} from "../features/authSlice";
import Alert from "../components/Alert";

const Dashboard = () => {
    const [active, setActive] = useState("inbox");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isError} = useSelector((state) => state.auth);
    const {isAlertSuccess, alertMessage} = useSelector((state) => state.alert);

    useEffect(() => {
        dispatch(GetMe());
    }, []);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError]);

    useEffect(() => {
        if (user) {
            if (user.role === "user") {
                navigate("/");
            }
        }
    }, [navigate, user]);



    return (
        <div className={`bg-gray-50 min-h-screen ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <div className={"py-5 px-4 md:px-6"}>
                    <Link
                        className={"mb-3 flex items-center gap-2 font-poppins"}
                        to={"/"}>
                        <img src={Back} alt={"Back"} className={"w-[30px]"}/> <span>Beranda</span>
                    </Link>
                    {isAlertSuccess && <Alert color={"blue"} message={alertMessage}/>}
                    <div className={"flex flex-col gap-4 lg:flex-row"}>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"w-full min-w-[320px] bg-white px-4 py-6 rounded-lg shadow"}>
                                <div className={"flex flex-col justify-center items-center font-poppins "}>
                                    <div
                                        className={"w-[75px] h-[75px] bg-gray-50 rounded-full border-[1px] flex items-center justify-center"}>
                                           <span className={"text-[32px]"}>{user ? user.email.substring(0,1) : "A"}</span>
                                    </div>
                                    <h3 className={"text-[18px] mt-2 text-center"}>
                                        Selamat datang,
                                        <span className={"block font-bold w-[280px] overflow-hidden"}>{user ? user.email : "Admin"}</span>
                                    </h3>
                                </div>
                            </div>
                            <div className={"w-full min-w-[320px] bg-white rounded-lg shadow"}>
                                <ul className={"flex overflow-auto lg:flex-col"}>
                                    {navDashboard.map((item) => (
                                        <li
                                            className={`py-4 px-6 font-poppins text-[16px] cursor-pointer lg:hover:bg-gray-50 border-b-[1px] min-w-[170px]
                                                    ${active === item.id ? "font-semibold bg-gray-50" : "font-normal text-gray-500"}
                                                `}
                                            key={item.id}>
                                            <Link
                                                onClick={() => setActive(item.id)}
                                                to={item.url}>
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={"w-full max-w-content overflow-x-auto bg-white py-6 rounded-lg shadow"}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
