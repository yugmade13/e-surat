import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {alertMessageError, alertMessageSuccess} from "../../features/alertSlice";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Alert from "../../components/Alert";

const LetterCreate = () => {
    const dispatch = useDispatch();
    const {isAlertError, alertMessage} = useSelector((state) => state.alert);
    const navigate = useNavigate();
    const [name, setName] = useState("");


    const createLetter = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3300/letters", {
                name: name
            });

            navigate("/dashboard/letters");
            dispatch(alertMessageSuccess("Create Letter Category Success"));
        } catch (error) {
            if (error.response) {
                dispatch(alertMessageError(error.response.data.message));
            }
        }
    }

    return (
        <div className={"px-6"}>
            {isAlertError && <Alert color={"red"} message={alertMessage}/>}
            <form onSubmit={createLetter}>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"name"}>Nama Surat</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                        type={"text"}
                        id={"name"}
                        placeholder={"Nama Surat"}/>
                </div>
                <button
                    type={"submit"}
                    className={"w-full font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}>
                    Buat Surat Baru
                </button>
                <Link
                    to={"/dashboard/letters"}
                    className={"w-full block text-center font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}>
                    Batal
                </Link>
            </form>
        </div>
    );
};

export default LetterCreate;
