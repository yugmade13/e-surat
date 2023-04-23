import React, {useEffect, useState} from 'react';
import styles from "../style";
import {Outlet, useNavigate} from "react-router-dom";
import {navProfile} from "../constant";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetMe} from "../features/authSlice";

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isError} = useSelector((state) => state.auth);

    const [active, setActive] = useState("account");

    useEffect(() => {
        dispatch(GetMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    return (
        <section className={`bg-gray-50 min-h-screen ${styles.flexStart}`}>
            <div className={`${styles.boxWidthSmall}`}>
                <div className={"py-10 px-4 md:px-6"}>
                    <div className={"flex flex-col gap-4 md:flex-row"}>
                        <div className={"w-full bg-white h-max rounded-full shadow md:max-w-[320px] md:rounded-lg"}>
                            <ul className={"flex flex-row justify-between md:flex-col md:justify-center"}>
                                {navProfile.map((item) => (
                                    <li
                                        className={`py-4 px-6 flex-1 text-center font-poppins text-[16px] cursor-pointer lg:hover:bg-gray-50 border-b-[1px]
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
                        <div className={"w-full bg-white p-6 rounded-lg shadow"}>
                           <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
