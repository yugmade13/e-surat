import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Letters = () => {
    const [letters, setLetters] = useState([]);

    const getLetters = async () => {
        const response = await axios.get("http://localhost:5000/letters");
        return response.data;
    }

    const deleteLetter = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/letters/${id}`);

            getLetters()
                .then((letters) => setLetters(letters))
                .catch((error) => console.log(error.message));
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getLetters()
            .then((letters) => setLetters(letters))
            .catch((error) => console.log(error.message));
    }, []);


    return (
        <>
            <section className={"w-full"}>
                <div className={"p-4 flex justify-between items-center gap-5"}>
                    <h4 className={"font-poppins font-semibold text-[18px]"}>Surat</h4>
                    <Link
                        to={"/dashboard/letters/create"}
                        className={"font-poppins bg-primary px-2.5 py-1 rounded-lg text-white"}>
                        Tambah
                    </Link>
                </div>
                <div className={"overflow-x-auto"}>
                    {letters.length
                        ? (
                            <table className={"w-full bg-white text-sm text-left font-poppins"}>
                                <thead>
                                    <tr>
                                        <th scope={"col"} className={"p-4 min-w-[300px]"}>Nama Surat</th>
                                        <th scope={"col"} className={"p-4"}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {letters.map((letter) => (
                                    <tr key={letter.id} className={"border-y hover:shadow hover:bg-gray-50"}>
                                        <td scope={"col"} className={"p-4 min-w-[300px]"}>{letter.name}</td>
                                        <td scope={"col"} className={"p-4"}>
                                            <Link
                                                className={"bg-blue-500 px-2.5 py-1 rounded-lg text-white"}
                                                to={`/dashboard/letters/${letter.id}`}>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteLetter(letter.id)}
                                                className={"bg-red-500 px-2.5 ml-2 py-1 rounded-lg text-white"}>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className={"px-4 font-poppins"}>Belum tersedia kategori surat</div>
                        )
                    }
                </div>
            </section>
        </>
    );
};

export default Letters;
