import React, {useEffect, useState} from 'react';
import {alertMessageError, alertMessageSuccess} from "../features/alertSlice";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import Alert from "./Alert";

const Account = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {isAlertError, isAlertSuccess, alertMessage} = useSelector((state) => state.alert);

    const [noKK, setNoKK] = useState("");
    const [nik, setNik] = useState("");
    const [name, setName] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [religion, setReligion] = useState("");
    const [profession, setProfession] = useState("");
    const [citizen, setCitizen] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [phone, setPhone] = useState("");

    const [toggle, setToggle] = useState(false);

    const getUserProfile = async () => {
        const response = await axios.get(`http://localhost:5000/profiles/${user.id}`);
        return response.data;
    }

    useEffect(() => {
        getUserProfile()
            .then((data) => {
                setNoKK(data.no_kk);
                setNik(data.nik);
                setName(data.name);
                setPlaceOfBirth(data.place_of_birth);
                setDateOfBirth(data.date_of_birth);
                setGender(data.gender);
                setAddress(data.address);
                setReligion(data.religion);
                setProfession(data.profession);
                setCitizen(data.citizen);
                setMaritalStatus(data.marital_status);
                setPhone(data.phone);
            })
            .catch((error) => console.log(error.message));
    }, [user]);

    const onUpdate = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:5000/profiles/${user.id}`, {
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
                phone
            });

            dispatch(alertMessageSuccess(response.data.message));
            setToggle(!toggle);
        } catch (error) {
            if (error.message) {
                dispatch(alertMessageError(error.response.data.message));
            }
        }
    }

    return (
        <div>
            {isAlertError && <Alert color={"red"} message={alertMessage}/>}
            {isAlertSuccess && <Alert color={"blue"} message={alertMessage}/>}
            <form onSubmit={onUpdate}>
                <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                    <div className={"mb-4 flex-1"}>
                        <label
                            className={"font-poppins block mb-2"}
                            htmlFor={"kk"}>No. KK</label>
                        <input
                            value={noKK}
                            disabled={!toggle}
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
                            value={nik}
                            disabled={!toggle}
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
                            value={name}
                            disabled={!toggle}
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
                            value={placeOfBirth}
                            disabled={!toggle}
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
                            value={dateOfBirth}
                            disabled={!toggle}
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
                            disabled={!toggle}
                            onChange={(e) => setGender(e.target.value)}
                            value={gender}
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
                            disabled={!toggle}
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
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
                            disabled={!toggle}
                            onChange={(e) => setReligion(e.target.value)}
                            value={religion}
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
                            value={profession}
                            disabled={!toggle}
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
                            value={citizen}
                            disabled={true}
                            onChange={(e) => setCitizen("Indonesia")}
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
                            disabled={!toggle}
                            onChange={(e) => setMaritalStatus(e.target.value)}
                            value={maritalStatus}
                            className="w-full font-poppins border border-gray-300 p-2.5 text-gray bg-gray-50 rounded-lg">
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
                            value={phone}
                            disabled={!toggle}
                            onChange={(e) => setPhone(e.target.value)}
                            className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                            type={"number"}
                            id={"phone"}
                            placeholder={"081 xxx xxx xxx"}/>
                    </div>
                </div>

                <div className={"flex justify-end gap-4 mt-5"}>
                    {toggle
                        ? (
                           <>
                               <button
                                   onClick={(event) => {
                                       event.preventDefault();
                                       setToggle(!toggle)
                                   }}
                                   className={"font-poppins text-white bg-primary py-2.5 px-4 rounded-lg"}>
                                   Batal
                               </button>
                               <button
                                   className={"font-poppins text-white bg-primary py-2.5 px-4 rounded-lg"}
                                   type={"submit"}>
                                   Simpan
                               </button>
                           </>
                        ) : (
                        <button
                            onClick={(event) => {
                                event.preventDefault();
                                setToggle(!toggle)
                            }}
                            className={"font-poppins text-white bg-primary py-2.5 px-4 rounded-lg"}>
                            Ubah
                        </button>
                        )
                    }
                </div>
            </form>
        </div>
    );
};

export default Account;
