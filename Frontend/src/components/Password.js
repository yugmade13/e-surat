import React, {useState} from 'react';
import {alertMessageSuccess, alertMessageError} from "../features/alertSlice";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import Alert from "./Alert";

const Password = () => {
    const dispacth = useDispatch();
    const {isAlertError, isAlertSuccess, alertMessage} = useSelector((state) => state.alert);
    const {user} = useSelector((state) => state.auth);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/users/change-password/${user.id}`, {
                password,
                confirmPassword
            });

            dispacth(alertMessageSuccess(response.data.message));
            setPassword("");
            setConfirmPassword("");
        } catch (error) {
            if (error.message) {
                dispacth(alertMessageError(error.response.data.message));
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {isAlertError && <Alert color={"red"} message={alertMessage}/>}
            {isAlertSuccess && <Alert color={"blue"} message={alertMessage}/>}
            <h3 className={"font-poppins font-semibold text-[22px] text-center mb-6"}>Cahnge Password</h3>
            <div className={"mb-4 flex-1"}>
                <label
                    className={"font-poppins block mb-2"}
                    htmlFor={"password"}>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                    type={"password"}
                    id={"password"}
                    placeholder={"********"}/>
            </div>
            <div className={"mb-4 flex-1"}>
                <label
                    className={"font-poppins block mb-2"}
                    htmlFor={"confirmPassword"}>Confirm Password</label>
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                    type={"password"}
                    id={"confirmPassword"}
                    placeholder={"********"}/>
            </div>
            <button
                className={"w-full mt-5 font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}
                type={"submit"}>
                Simpan
            </button>
        </form>
    );
};

export default Password;
