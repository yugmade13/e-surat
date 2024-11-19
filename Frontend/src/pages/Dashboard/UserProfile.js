import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
    const {id} = useParams();

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

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [status, setStatus] = useState("");

    const updateUser = async () => {
        let statusUser;

        if (status === 'unactive') {
            statusUser = 'active'
        } else {
            statusUser = 'unactive'
        }

        try {
            await axios.patch(`http://localhost:3300/users/${id}`, {
                email,
                role,
                status: statusUser
            });

            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    }

    const getUserProfiles = async () => {
        const response = await axios.get(`http://localhost:3300/profiles/${id}`);
        return response.data;
    }

    useEffect(() => {
        getUserProfiles()
            .then((user) => {
                setEmail(user.user.email);
                setRole(user.user.role);
                setStatus(user.user.status);

                setNoKK(user.no_kk);
                setNik(user.nik);
                setName(user.name);
                setPlaceOfBirth(user.place_of_birth);
                setDateOfBirth(user.date_of_birth);
                setGender(user.gender);
                setAddress(user.address);
                setReligion(user.religion);
                setProfession(user.profession)
                setCitizen(user.citizen)
                setMaritalStatus(user.marital_status);
                setPhone(user.phone);
            })
            .catch((error) => console.log(error.message))
    }, [])

    return (
        <div className={"px-6"}>
            <Link
                className={"inline-block font-poppins text-blue-500 underline mb-5"}
                to={"/dashboard/users"}>
                Kembali
            </Link>
            <table className={"w-full bg-white text-sm text-left font-poppins"}>
                <tbody>
                <tr className={"border-b"}>
                    <td scope={"col"} className={"p-2"}>Email</td>
                    <td scope={"col"} className={"p-2"}>: {email}</td>
                </tr>
                <tr className={"border-b"}>
                    <td scope={"col"} className={"p-2"}>Status</td>
                    <td scope={"col"} className={"p-2"}><span>: </span>
                        <button
                            onClick={updateUser}
                            className={"text-blue-500"}>
                            {status}
                        </button>
                    </td>
                </tr>
                <tr className={"border-b"}>
                    <td scope={"col"} className={"p-2"}>Role</td>
                    <td scope={"col"} className={"p-2"}>: {role}</td>
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
                    <td scope={"col"} className={"p-2"}>Phone</td>
                    <td scope={"col"} className={"p-2"}>: {phone}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserProfile;
