import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {alertMessageError, alertMessageSuccess} from "../../features/alertSlice";
import Alert from "../../components/Alert";

const LetterEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const {isAlertError, alertMessage} = useSelector((state) => state.alert);

    const getLetterById = async () => {
        const response = await axios.get(`http://localhost:5000/letters/${id}`);
        return response.data;
    }

    useEffect(() => {
        getLetterById()
            .then((letter) => setName(letter.name))
            .catch((error) => console.log(error.message));
    }, []);

    const updateLetter = async (event) => {
        event.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/letters/${id}`, {
                name: name
            });

            navigate("/dashboard/letters");
            dispatch(alertMessageSuccess("Update Letter Category Success"))
        } catch (error) {
            if (error.response) {
                dispatch(alertMessageError(error.response.data.message));
            }
        }
    }

    return (
        <div className={"px-6"}>
            {isAlertError && <Alert color={"red"} message={alertMessage}/>}
            <form onSubmit={updateLetter}>
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
                    Edit Surat
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

export default LetterEdit;
