import React, {useEffect, useState} from 'react';
import axios from "axios";
import {alertMessageError, alertMessageSuccess} from "../features/alertSlice";
import {useSelector, useDispatch} from "react-redux";
import Alert from "./Alert";

const FormCreateLetterTwo = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {isAlertError, isAlertSuccess, alertMessage} = useSelector((state) => state.alert);
    const [listLetter, setListLetter] = useState([]);

    const [letterName, setLetterName] = useState("");
    const [letterID, setLetterID] = useState("");
    const [noKK, setNoKK] = useState("");
    const [nik, setNik] = useState("");
    const [name, setName] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [religion, setReligion] = useState("");
    const [profession, setProfession] = useState("");
    const [citizen, setCitizen] = useState("Indonesia");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [phone, setPhone] = useState("");
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
            const response = await axios.post("http://localhost:3300/request-letters/everyone", {
                user_id: user.id,
                letterID,
                noKK,
                nik,
                name,
                placeOfBirth,
                dateOfBirth,
                gender,
                address,
                religion,
                profession,
                citizen,
                maritalStatus,
                phone,
                note,
                letter_name: letterName
            });

            dispatch(alertMessageSuccess(response.data.message));
            setLetterName("");
            setNoKK("");
            setNik("");
            setName("");
            setPlaceOfBirth("");
            setDateOfBirth("");
            setGender("");
            setAddress("");
            setReligion("");
            setProfession("");
            setMaritalStatus("");
            setPhone("");
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
                            defaultValue=""
                            className="w-full font-poppins border border-gray-300 p-2.5 text-gray bg-gray-50 rounded-lg">
                            <option value="" disabled>Pilih</option>
                            {listLetter.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
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
            <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"kk"}>No. KK</label>
                    <input
                        onChange={(e) => setNoKK(e.target.value)}
                        className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                        type={"text"}
                        id={"kk"}
                        placeholder={"Nomor Kartu Keluarga"}/>
                </div>
                <div className={"font-poppins mb-4 flex-1"}>
                    <label
                        className={"block mb-2"}
                        htmlFor={"nik"}>NIK</label>
                    <input
                        onChange={(e) => setNik(e.target.value)}
                        className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                        type={"text"}
                        id={"nik"}
                        placeholder={"Nomor Induk Kependudukan"}/>
                </div>
            </div>

            <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"name"}>Nama Lengkap</label>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                        type={"text"}
                        id={"name"}
                        placeholder={"Nama Lengkap"}/>
                </div>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"place_of_birth"}>Tempat Lahir</label>
                    <input
                        onChange={(e) => setPlaceOfBirth(e.target.value)}
                        className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                        type={"text"}
                        id={"place_of_birth"}
                        placeholder={"Tempat Lahir"}/>
                </div>
            </div>

            <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"birthday"}>Tanggal Lahir</label>
                    <input
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                        type={"date"}
                        id={"birthday"}
                        placeholder={"Birdthday"}/>
                </div>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"gender"}>Jenis Kelamin</label>
                    <select
                        onChange={(e) => setGender(e.target.value)}
                        defaultValue=""
                        className="w-full font-poppins border border-gray-300 p-2.5 text-gray bg-gray-50 rounded-lg">
                        <option value="" disabled>Pilih</option>
                        <option value="L">Laki - laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>
            </div>

            <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"address"}>Alamat</label>
                    <select
                        onChange={(e) => setAddress(e.target.value)}
                        defaultValue={""}
                        className="w-full font-poppins border border-gray-300 p-2.5 text-gray bg-gray-50 rounded-lg">
                        <option value="" disabled>Pilih</option>
                        <option value="Kadilangu RT 01 RW 01 Baki Sukoharjo">Kadilangu RT 01 RW 01 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 01 RW 02 Baki Sukoharjo">Kadilangu RT 01 RW 02 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 02 RW 01 Baki Sukoharjo">Kadilangu RT 02 RW 01 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 02 RW 02 Baki Sukoharjo">Kadilangu RT 02 RW 02 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 01 RW 03 Baki Sukoharjo">Kadilangu RT 01 RW 03 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 02 RW 03 Baki Sukoharjo">Kadilangu RT 02 RW 03 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 03 RW 03 Baki Sukoharjo">Kadilangu RT 03 RW 03 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 04 RW 03 Baki Sukoharjo">Kadilangu RT 04 RW 03 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 01 RW 04 Baki Sukoharjo">Kadilangu RT 01 RW 04 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 02 RW 04 Baki Sukoharjo">Kadilangu RT 02 RW 04 Baki Sukoharjo</option>
                        <option value="Kadilangu RT 03 RW 04 Baki Sukoharjo">Kadilangu RT 03 RW 04 Baki Sukoharjo</option>
                    </select>
                </div>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"religion"}>Agama</label>
                    <select
                        onChange={(e) => setReligion(e.target.value)}
                        defaultValue=""
                        className="w-full font-poppins border border-gray-300 p-2.5 text-gray bg-gray-50 rounded-lg">
                        <option value="" disabled>Pilih</option>
                        <option value="Islam">Islam</option>
                        <option value="Kristen">Kristen</option>
                        <option value="Katolik">Katolik</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Budha">Budha</option>
                    </select>
                </div>

            </div>

            <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"profession"}>Pekerjaan</label>
                    <input
                        onChange={(e) => setProfession(e.target.value)}
                        className={"w-full font-poppins border border-gray-300  bg-gray-50 p-2.5 rounded-lg"}
                        type={"text"}
                        id={"profession"}
                        placeholder={"Pekerjaan"}/>
                </div>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"citizen"}>Warga Negara</label>
                    <input
                        disabled={true}
                        className={"w-full font-poppins border border-gray-900 bg-white p-2.5 rounded-lg"}
                        type={"text"}
                        id={"citizen"}
                        placeholder={"Indonesia"}/>
                </div>
            </div>

            <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"marital_status"}>Status Pernikahan</label>
                    <select
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        defaultValue=""
                        className="w-full font-poppins border border-gray-300 p-2.5  bg-gray-50 rounded-lg">
                        <option value="" disabled>Pilih</option>
                        <option value="Kawin">Kawin</option>
                        <option value="Belum Kawin">Belum Kawin</option>
                        <option value="Cerai">Cerai Hidup/Mati</option>
                    </select>
                </div>
                <div className={"mb-4 flex-1"}>
                    <label
                        className={"font-poppins block mb-2"}
                        htmlFor={"phone"}>No. HP</label>
                    <input
                        onChange={(e) => setPhone(e.target.value)}
                        className={"w-full font-poppins border border-gray-300  bg-gray-50 p-2.5 rounded-lg"}
                        type={"number"}
                        id={"phone"}
                        placeholder={"Kosongkan bila tidak ada"}/>
                </div>
            </div>
            <div className={"mb-4"}>
                <label
                    className="font-poppins block mb-2"
                    htmlFor="note">
                    {letterName === "Surat Keterangan Usaha" ?
                        <p className={"text-red-500 font-poppins"}>* Tuliskan nama usaha pada kolom
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
                        className={"w-full mt-10 font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}
                        type={"submit"}>
                        Buat Surat Untuk Orang
                    </button>
                ) : (
                    <button
                        className={"w-full font-poppins text-white bg-gray-500 py-2.5 rounded-lg mb-4"}
                        disabled={true}>
                        Buat Surat Untuk Orang
                    </button>
                )
            }
        </form>
    );
};

export default FormCreateLetterTwo;
