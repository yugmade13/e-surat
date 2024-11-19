import React, {useEffect, useState} from 'react';
import axios from "axios";
import styles from "../style";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Sent = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    const [listLetter, setListLetter] = useState([]);

    useEffect(() => {
        if (user) {
            if (user.role === "admin") {
                navigate("/");
            }
        }
    }, [navigate, user]);

    const getLetterRequest = async () => {
        const response = await axios.get("http://localhost:3300/request-letters");
        return response.data;
    }

    useEffect(() => {
        getLetterRequest()
            .then((letters) => setListLetter(letters))
            .catch((error) => console.log(error.message));
    }, []);

    return (
        <section className={`bg-gray-50 h-screen ${styles.flexStart}`}>
            <div className={`${styles.boxWidthSmall}`}>
                <div className={"py-10 px-6"}>
                    <div className={"w-full bg-white py-6 rounded-t-xl"}>
                        <h3 className={"font-poppins font-semibold text-[22px] text-center"}>Surat Permohonan
                            Terkirim</h3>
                    </div>
                    <div className={"overflow-x-auto"}>
                        {listLetter.length
                            ? (
                                <table className={"w-full bg-white text-sm text-left font-poppins"}>
                                    <thead>
                                    <tr className={"border-y hover:shadow hover:bg-gray-50"}>
                                        <th scope={"col"} className={"p-4 min-w-[300px]"}>Nama Surat</th>
                                        <th scope={"col"} className={"p-4 min-w-[200px]"}>Tanggal</th>
                                        <th scope={"col"} className={"p-4 min-w-[300px]"}>Keterangan</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listLetter.map((item, index) => (
                                        <tr key={index} className={"border-y hover:shadow hover:bg-gray-50"}>
                                            <th scope={"col"} className={"p-4"}>
                                                {item.letter
                                                    ? item.letter.name
                                                    : <span className={"text-red-500"}>Jenis surat telah dihapus</span>
                                                }
                                            </th>
                                            <td scope={"col"}
                                                className={"p-4"}>{new Date(item.created_at).toLocaleString()}</td>
                                            <td scope={"col"} className={"p-4 max-w-[500px]"}>{item.note}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className={"bg-white text-center font-poppins"}>Belum ada permohonan surat</div>
                            )
                        }
                    </div>
                    <div className={"w-full h-[10px] bg-white py-4 px-6 rounded-b-xl"}>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sent;
