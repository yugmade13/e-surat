import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {LoginUser, reset} from "../features/authSlice";
import {KLogo} from "../assets";
import {Link} from "react-router-dom";
import Alert from "../components/Alert";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, isSucces, isError, message} = useSelector((state) => state.auth);
    const {isAlertSuccess, alertMessage} = useSelector((state) => state.alert)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user || isSucces) {
            if (user.role === "user") {
                navigate("/");
            } else {
                navigate("/dashboard");
            }
        }

        dispatch(reset);
    }, [user, navigate, dispatch, isSucces]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(LoginUser({email, password}));
    }

    return (
        <section className={"w-full md:bg-gray-50"}>
            <div className={"h-screen flex flex-col justify-center items-center text-gray-600"}>
                <div className={"w-full max-w-[510px]"}>
                    {isAlertSuccess && <Alert color={"blue"} message={alertMessage}/>}
                </div>
                <div className={"bg-white w-full max-w-lg px-6 py-10 rounded-lg md:shadow"}>
                    <div className={"font-poppins flex flex-col justify-center items-center mb-10"}>
                        <img alt={"KLogo"} src={KLogo} className={"w-[75px] my-2"}/>
                        <h2 className={"text-[32px] font-bold text-gray-900"}>Surat Online</h2>
                        {isError
                            ? <p className={"text-red-500"}>{message}</p>
                            : <p>Masuk dengan akun anda</p>
                        }
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={"mb-4"}>
                            <label
                                className={"block mb-2 font-poppins"}
                                htmlFor={"email"}>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={"w-full border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg font-poppins"}
                                type={"text"}
                                id={"email"}
                                placeholder={"@email"}/>
                        </div>
                        <div className={"mb-4"}>
                            <label
                                className={"block mb-2 font-poppins"}
                                htmlFor={"password"}>Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={"w-full border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg font-poppins"}
                                type={"password"}
                                id={"password"}
                                placeholder={"********"}/>
                        </div>
                        <button
                            type={"submit"}
                            className={"w-full font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}>
                            Login
                        </button>
                        <div className={"font-poppins text-center"}>
                            <p>Tidak punya akun?
                                <Link
                                    className={"inline-block ml-1 my-4 text-blue-600 underline"}
                                    to={"/register"}>
                                    Register
                                </Link>
                            </p>
                            <Link
                                className={"underline text-blue-600 mt-8"}
                                to={"/"}>
                                Kembali ke beranda
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
