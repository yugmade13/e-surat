import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const DashboardInbox = () => {
    const [listLetter, setListLetter] = useState([]);

    const getLetterRequest = async () => {
        const response = await axios.get("http://localhost:5000/request-letters");
        return response.data;
    }

    useEffect(() => {
        getLetterRequest()
            .then((letters) => setListLetter(letters))
            .catch((error) => console.log(error.message));
    }, []);

    return (
        <section className={"w-full"}>
            <h4 className={"font-poppins font-semibold text-[18px] text-center mb-5"}>Permohonan Masuk</h4>
            <div className={"overflow-x-auto"}>
                {listLetter.length
                    ? (
                        <table className={"w-full bg-white text-sm text-left font-poppins"}>
                            <thead>
                            <tr>
                                <th scope={"col"} className={"p-4 min-w-[300px]"}>Surat</th>
                                <th scope={"col"} className={"p-4 p-4 min-w-[200px]"}>Nama Pemohon</th>
                                <th scope={"col"} className={"p-4 p-4 min-w-[200px]"}>Tanggal</th>
                                <th scope={"col"} className={"p-4 p-4 min-w-[300px]"}>Keterangan</th>
                                <th scope={"col"} className={"p-4 min-w-[150px]"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {listLetter.map((item, index) => (
                                <tr key={index} className={"border-y hover:shadow hover:bg-gray-50"}>
                                    <td scope={"col"} className={"p-4"}>
                                        {item.letter
                                            ? item.letter.name
                                            : <span className={"text-red-500"}>Jenis surat telah terhapus</span>
                                        }
                                    </td>
                                    <td scope={"col"} className={"p-4"}>
                                        {item.user
                                            ? item.user.user_profile.name
                                            : <span className={"text-red-500"}>User telah dihapus</span>
                                        }
                                    </td>
                                    <td scope={"col"} className={"p-4"}>{new Date(item.created_at).toLocaleString()}</td>
                                    <td scope={"col"} className={"p-4"}>{item.note}</td>
                                    <td scope={"col"} className={"p-4"}>
                                        {item.letter && item.user
                                            ? (
                                                <Link
                                                    to={`/dashboard/sent/${item.id}`}
                                                    className={"bg-blue-500 px-2.5 py-1 rounded-lg text-white"}>
                                                    Lihat Detail
                                                </Link>
                                            ) : (
                                                <span className={"bg-blue-300 px-2.5 py-1 rounded-lg text-white cursor-pointer"}>
                                            Lihat detail
                                        </span>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={"text-center font-poppins"}>Belum ada permohonan masuk</div>
                    )
                }
            </div>
        </section>
    );
};

export default DashboardInbox;
