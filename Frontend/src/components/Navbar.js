import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LogoutUser, reset} from "../features/authSlice";
import {navLinks} from "../constant";
import {Menu, Close, Logo} from "../assets";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isSuccess} = useSelector((state) => state.auth);

    const [navlist, setNavlist] = useState([])
    const [toggle, setToggle] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        if (user) {
            if (user.role === "user") {
                setNavlist(navLinks.filter((item) => item.id !== "dashboard"));
            }

            if (user.role === "admin") {
               setNavlist(navLinks.filter((item) => item.id !== "sent" && item.id !== "inbox"));
            }
        } else {
            setNavlist([]);
        }
    }, [user]);

    const Logout = () => {
        dispatch(LogoutUser());
        dispatch(reset());
        navigate("/login");
    }

    return (
        <nav className="w-full flex py-4 justify-between items-center">
            <img src={Logo} alt="Kadilangu" className="h-[38px]"/>
            <div className={isSuccess ? "hidden" : "text-[16px] ml-10"}>
                <button
                    onClick={Logout}
                    className={"font-poppins text-primary text-center text-[14px] bg-secondary py-2 px-6 rounded-full"}>
                    Login
                </button>
            </div>
            {isSuccess && (
                <ul className="list-none md:flex hidden justify-end items-center flex-1">
                    {navlist.map((link, index) => (
                        <li
                            key={index}
                            className={`font-poppins font-normal text-[16px] cursor-pointer
                            ${
                                active === link.title
                                    ? "text-white"
                                    : "text-dimWhite"
                            }
                            ${
                                index === navLinks.length - 1 ? "mr-0" : "mr-10"
                            }`}
                            onClick={() => setActive(link.title)}>
                            <Link to={link.url}>{link.title}</Link>
                        </li>
                    ))}
                    <div className={!isSuccess ? "hidden" : "text-[14px]"}>
                        {isSuccess
                            ? (
                                <button
                                    onClick={Logout}
                                    className={"font-poppins text-primary text-center bg-secondary py-2 px-6 rounded-full"}>
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    className={"font-poppins text-primary text-center bg-secondary py-2 px-6 rounded-full"}
                                    to={"/login"}>
                                    Login
                                </Link>
                            )
                        }
                    </div>
                </ul>
            )}
            {isSuccess && (
                <div className="md:hidden flex justify-center items-center">
                    <img
                        src={toggle ? Close : Menu}
                        alt="toggle-menu"
                        className="w-[28px] h-[28px] object-contain"
                        onClick={() => setToggle(!toggle)}/>
                    <div className={`${!toggle ? "hidden" : "flex flex-col"}
                    absolute top-16 right-0 bg-black-gradient p-4 mx-4 min-w-[340px] rounded-lg sidebar`}>
                        <ul className="list-none flex justify-end items-start flex-col">
                            {navlist.map((link, index) => (
                                <li
                                    key={index}
                                    className={`w-full font-poppins font-normal text-[16px] cursor-pointer
                                ${
                                        active === link.id
                                            ? "text-white"
                                            : "text-dimWhite"
                                    }`}
                                    onClick={() => {
                                        setActive(link.id);
                                        setToggle(!toggle);
                                    }}>
                                    <Link
                                        className={"block p-4 hover:bg-primary rounded-lg"}
                                        to={link.url}>{link.title}
                                    </Link>
                                </li>
                            ))}
                            <div className={"w-full text-[16px] mt-4"}>
                                {isSuccess
                                    ? (
                                        <button
                                            onClick={Logout}
                                            className={"font-poppins w-full text-primary text-center bg-secondary py-2 rounded-full"}>
                                            Logout
                                        </button>
                                    ) : (
                                        <Link
                                            className={"font-poppins block text-primary text-center bg-secondary py-2 rounded-full"}
                                            to={"/login"}>
                                            Login
                                        </Link>
                                    )
                                }
                            </div>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
