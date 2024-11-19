import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {alertMessageError, alertMessageSuccess} from "../../features/alertSlice";
import {Link} from "react-router-dom";
import axios from "axios";
import Alert from "../../components/Alert";

const UserCreate = () => {
    const dispatch = useDispatch();
    const {isAlertError, alertMessage} = useSelector((state) => state.alert);
    const navigate = useNavigate();

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

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const [role, setRole] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const createUser = async (event) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3300/users/register", {
                email,
                password,
                confirmPassword,
                status,
                role,
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

            navigate("/dashboard/users");
            dispatch(alertMessageSuccess("Create Account Success"));
        } catch (error) {
            if (error.response) {
                dispatch(alertMessageError(error.response.data.message));
            }
        }
    }

    return (
        <div className={"px-6"}>
            <form onSubmit={createUser}>
                {isAlertError && <Alert color={"red"} message={alertMessage}/>}
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
                            onChange={(e) => setPhone(e.target.value)}
                            className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                            type={"number"}
                            id={"phone"}
                            placeholder={"081 xxx xxx xxx"}/>
                    </div>
                </div>

                <hr className={"my-10 border border-slate-300"}/>

                <div className={"mb-4"}>
                    <label
                        className={"font-poppinsblock mb-2"}
                        htmlFor={"email"}>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                        type={"text"}
                        id={"email"}
                        placeholder={"@email"}/>
                </div>

                <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                    <div className={"mb-4 flex-1"}>
                        <label
                            className={"font-poppins block mb-2"}
                            htmlFor={"role"}>Role</label>
                        <select
                            onChange={(e) => setRole(e.target.value)}
                            defaultValue=""
                            className="w-full font-poppins border border-gray-300 p-2.5 text-gray bg-gray-50 rounded-lg">
                            <option value="" disabled>Pilih</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className={"mb-4 flex-1"}>
                        <label
                            className={"font-poppins block mb-2"}
                            htmlFor={"status"}>Status</label>
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            defaultValue=""
                            className="w-full font-poppins border border-gray-300 p-2.5 text-gray bg-gray-50 rounded-lg">
                            <option value="" disabled>Pilih</option>
                            <option value="active">Active</option>
                            <option value="unactive">Unactive</option>
                        </select>
                    </div>
                </div>

                <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                    <div className={"mb-4 flex-1"}>
                        <label
                            className={"font-poppins block mb-2"}
                            htmlFor={"password"}>Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                            type={"password"}
                            id={"password"}
                            placeholder={"********"}/>
                    </div>
                    <div className={"mb-10 flex-1"}>
                        <label
                            className={"font-poppins block mb-2"}
                            htmlFor={"confirmPassword"}>Confirm Password</label>
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                            type={"password"}
                            id={"confirmPassword"}
                            placeholder={"********"}/>
                    </div>
                </div>
                <button
                    type={"submit"}
                    className={"w-full font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}>
                    Buat Akun
                </button>
                <Link
                    to={"/dashboard/users"}
                    className={"w-full block text-center font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}>
                    Batal
                </Link>
            </form>
        </div>
    );
};

export default UserCreate;
