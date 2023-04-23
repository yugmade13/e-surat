import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Alert from "../../components/Alert";

const SentEdit = () => {
    const {isAlertError, alertMessage} = useSelector((state) => state.alert);
    const {id} = useParams();

    const [account, setAccount] = useState(true);

    const [letter, setLetter] = useState("");
    const [note, setNote] = useState("");
    const [email, setEmail] = useState("");
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
    const [someone, setSomeone] = useState("");

    const getUserIdWithProfile = async (id) => {
        const response = await axios.get(`http://localhost:5000/users-profile/${id}`);
        setEmail(response.data.user.email);
        setNoKK(response.data.no_kk);
        setNik(response.data.nik);
        setName(response.data.name);
        setPlaceOfBirth(response.data.place_of_birth);
        setDateOfBirth(response.data.date_of_birth);
        setGender(response.data.gender);
        setAddress(response.data.address);
        setReligion(response.data.religion);
        setProfession(response.data.profession);
        setCitizen(response.data.citizen);
        setMaritalStatus(response.data.marital_status);
        setPhone(response.data.phone);
    }

    const getUserRequestToEveryone = async (id) => {
        const response = await axios.get(`http://localhost:5000/users-profile/${id}`);
        setName(response.data.name);
        setEmail(response.data.user.email);
    }

    const getLetter = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/letters/${id}`)
            setLetter(response.data.name);
        } catch (error) {
            console.log(error.message)
        }
    }

    const getRequestToEveryone = async (id) => {
        const response = await axios.get(`http://localhost:5000/request-to-everyone/${id}`);
        return response.data;
    }

    const getLetterById = async (id) => {
        const response = await axios.get(`http://localhost:5000/request-letters/${id}`);
        return response.data;
    }

    const getOrderById = async () => {
        const response = await axios.get(`http://localhost:5000/orders/${id}`);
        return response.data;
    }

    useEffect(() => {
        getOrderById()
            .then((letter) => {
                getRequestToEveryone(letter.request_letter_id)
                    .then((item) => {
                        if (item.message === "Data is Empty"){
                            setAccount(true);

                            getLetterById(letter.request_letter_id)
                                .then((result) => {
                                    setNote(result.note)

                                    getLetter(result.letter_id);
                                    getUserIdWithProfile(result.user_id);
                                })
                        } else {
                            setAccount(false);

                            setNoKK(item.no_kk);
                            setNik(item.nik);
                            setSomeone(item.name);
                            setPlaceOfBirth(item.place_of_birth);
                            setDateOfBirth(item.date_of_birth);
                            setGender(item.gender);
                            setAddress(item.address);
                            setReligion(item.religion);
                            setProfession(item.profession)
                            setCitizen(item.citizen)
                            setMaritalStatus(item.marital_status);
                            setPhone(item.phone);

                            getLetterById(letter.request_letter_id)
                                .then((result) => {
                                    setNote(result.note)

                                    getLetter(result.letter_id);
                                    getUserRequestToEveryone(letter.user_id);
                                })

                        }
                    })
            })
    }, []);

    return (
        <div className={"px-6"}>
            {isAlertError && <Alert color={"red"} message={alertMessage}/>}
            <Link
                className={"inline-block font-poppins text-blue-500 underline mb-5"}
                to={"/dashboard/sent"}>
                Kembali
            </Link>
            <div>
                {isAlertError && <Alert color={"red"} message={alertMessage}/>}
                {account
                    ? (
                        <table className={"w-full bg-white text-sm text-left font-poppins"}>
                            <tbody>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Email :</td>
                                <td scope={"col"} className={"p-2"}>: {email}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Nama Surat</td>
                                <td scope={"col"} className={"p-2 font-semibold"}>
                                    : {letter ? letter :
                                    <span className={"text-red-500"}>Jenis surat telah terhapus</span>}
                                </td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Keterangan</td>
                                <td scope={"col"} className={"p-2 font-semibold"}>: {note}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>NIK</td>
                                <td scope={"col"} className={"p-2"}>: {nik}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>No. KK</td>
                                <td scope={"col"} className={"p-2"}>: {noKK}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Nama</td>
                                <td scope={"col"} className={"p-2"}>: {name}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Tempat, Tanggal Lahir</td>
                                <td scope={"col"} className={"p-2"}>: {placeOfBirth}, {dateOfBirth}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Jenis Kelamin</td>
                                <td scope={"col"} className={"p-2"}>: {gender}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Alamat</td>
                                <td scope={"col"} className={"p-2"}>: {address}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Agama</td>
                                <td scope={"col"} className={"p-2"}>: {religion}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Pekerjaan</td>
                                <td scope={"col"} className={"p-2"}>: {profession}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Warga Negara</td>
                                <td scope={"col"} className={"p-2"}>: {citizen}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Status Pernikahan</td>
                                <td scope={"col"} className={"p-2"}>: {maritalStatus}</td>
                            </tr>
                            <tr className={"border-b"}>
                                <td scope={"col"} className={"p-2"}>Nomor HP</td>
                                <td scope={"col"} className={"p-2"}>: {phone}</td>
                            </tr>
                            </tbody>
                        </table>
                    )
                    : (
                        <div>
                            <table className={"w-full bg-white text-sm text-left font-poppins"}>
                                <tbody>
                                <tr className={"border-b"}>
                                    <td scope={"col"} className={"p-2"}>Nama</td>
                                    <td scope={"col"} className={"p-2"}>: {name}</td>
                                </tr>
                                <tr className={"border-b"}>
                                    <td scope={"col"} className={"p-2"}>Email</td>
                                    <td scope={"col"} className={"p-2"}>: {email}</td>
                                </tr>
                                <tr className={"border-b"}>
                                    <td scope={"col"} className={"p-2"}>Nama Surat</td>
                                    <td scope={"col"} className={"p-2 font-semibold"}>
                                        : {letter ? letter :
                                        <span className={"text-red-500"}>Jenis surat telah terhapus</span>}
                                    </td>
                                </tr>
                                <tr className={"border-b"}>
                                    <td scope={"col"} className={"p-2"}>Keterangan</td>
                                    <td scope={"col"} className={"p-2 font-semibold"}>: {note}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className={"mt-10 ml-5"}>
                                <p className={"font-poppins font-semibold"}>Membuatkan untuk :</p>
                                <table className={"w-full bg-white text-sm text-left font-poppins"}>
                                    <tbody>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>NIK</td>
                                        <td scope={"col"} className={"p-2"}>:{nik}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>No. KK</td>
                                        <td scope={"col"} className={"p-2"}>: {noKK}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Nama</td>
                                        <td scope={"col"} className={"p-2"}>: {someone}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Tempat, Tanggal Lahir</td>
                                        <td scope={"col"} className={"p-2"}>: {placeOfBirth}, {dateOfBirth}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Jenis Kelamin</td>
                                        <td scope={"col"} className={"p-2"}>: {gender}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Alamat</td>
                                        <td scope={"col"} className={"p-2"}>: {address}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Agama</td>
                                        <td scope={"col"} className={"p-2"}>: {religion}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Pekerjaan</td>
                                        <td scope={"col"} className={"p-2"}>: {profession}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Warga Negara</td>
                                        <td scope={"col"} className={"p-2"}>: {citizen}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Status Pernikahan</td>
                                        <td scope={"col"} className={"p-2"}>: {maritalStatus}</td>
                                    </tr>
                                    <tr className={"border-b"}>
                                        <td scope={"col"} className={"p-2"}>Nomor HP</td>
                                        <td scope={"col"} className={"p-2"}>: {phone}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>);
};

export default SentEdit;
