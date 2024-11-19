import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {alertMessageError, alertMessageSuccess} from "../features/alertSlice";
import axios from "axios";
import Alert from "./Alert";

const FormCreateLetterOne = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {isAlertSuccess, isAlertError, alertMessage} = useSelector((state) => state.alert);

    const [listLetter, setListLetter] = useState([]);
    const [letterName, setLetterName] = useState("");
    const [letterID, setLetterID] = useState("");
    const [note, setNote] = useState("");

    const getLetters = async () => {
        const response = await axios.get("http://localhost:3300/letters");
        return response.data;
    }

    useEffect(() => {
        getLetters()
            .then((letters) => setListLetter(letters))
            .catch((error) => console.log(error.message));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3300/request-letters", {
                user_id: user.id,
                letter_id: letterID,
                note,
                letter_name: letterName
            });

            dispatch(alertMessageSuccess(response.data.message));
            setLetterName("");
            setNote("");
        } catch (error) {
            if (error.response) {
                dispatch(alertMessageError(error.response.data.message));
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {isAlertError && <Alert color={"red"} message={alertMessage}/>}
            {isAlertSuccess && <Alert color={"blue"} message={alertMessage}/>}
            <div className={"mb-4"}>
                <label
                    className={"font-poppins block mb-2"}
                    htmlFor={"letter"}>Pilih Surat</label>
                {listLetter.length
                    ? (
                        <select
                            onChange={(e) => {
                                setLetterID(e.target.value)
                                setLetterName(e.target.options[e.target.selectedIndex].text)
                            }}
                            value={letterID}
                            className="w-full font-poppins border border-gray-300 p-2.5 text-gray bg-gray-50 rounded-lg">
                            <option value="" disabled>Pilih</option>
                            {listLetter.map((item, index) => (
                                <option key={index} name={item.name} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            disabled={true}
                            className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                            type={"text"}
                            placeholder={"Belum ada surat"}
                        />
                    )
                }
            </div>
            <div className={"mb-4"}>
                <label
                    className="font-poppins block mb-2"
                    htmlFor="note">
                    {letterName === "Surat Keterangan Usaha" ?
                        <p className={"text-red-500 font-poppins"}>*Tuliskan nama usaha pada kolom
                            keterangan</p> : "Keterangan"}
                </label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    id="note"
                    rows="4"
                    className="font-poppins p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                    placeholder={letterName === "Surat Keterangan Usaha" ? "Contoh : Warung Sembako" : "Contoh : Saya ingin membuat surat keterangan domisili untuk kakek saya"}>
                </textarea>
            </div>
            {listLetter.length
                ? (
                    <button
                        className={"w-full font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}
                        type={"submit"}>
                        Buat Surat
                    </button>
                ) : (
                    <button
                        className={"w-full font-poppins text-white bg-gray-500 py-2.5 rounded-lg mb-4"}
                        disabled={true}>
                        Buat Surat
                    </button>
                )
            }
        </form>
    );
};

export default FormCreateLetterOne;
