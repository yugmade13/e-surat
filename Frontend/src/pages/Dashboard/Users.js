import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:3300/users/${id}`);

            getUsers()
                .then((users) => setUsers(users))
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error.message);
        }
    }

    const getUsers = async () => {
        const response = await axios.get("http://localhost:3300/profiles");
        return response.data;
    }

    useEffect(() => {
        getUsers()
            .then((users) => setUsers(users))
            .catch((error) => console.log(error));
    }, []);

    return (
        <section className={"w-full"}>
            <div className={"p-4 flex justify-between items-center gap-5"}>
                <h4 className={"font-poppins font-semibold text-[18px]"}>Pengguna</h4>
                <Link
                    to={"/dashboard/users/create"}
                    className={"font-poppins bg-primary px-2.5 py-1 rounded-lg text-white"}>
                    Tambah
                </Link>
            </div>
            <div className={"overflow-x-auto"}>
                <table className={"w-full bg-white text-sm text-left font-poppins"}>
                    <thead>
                    <tr>
                        <th scope={"col"} className={"p-4 min-w-[200px]"}>NIK</th>
                        <th scope={"col"} className={"p-4 min-w-[300px]"}>Nama</th>
                        <th scope={"col"} className={"p-4 min-w-[300px]"}>Dibuat Tanggal</th>
                        <th scope={"col"} className={"p-4 min-w-[70px]"}>Role</th>
                        <th scope={"col"} className={"p-4 min-w-[100px]"}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className={"border-y hover:shadow hover:bg-gray-50"}>
                            <td scope={"col"} className={"p-4"}>{user.nik}</td>
                            <td scope={"col"} className={"p-4"}>
                                <Link
                                    className={"text-blue-500 underline"}
                                    to={`/dashboard/users/${user.user.id}`}>{user.name}</Link>
                            </td>
                            <td scope={"col"} className={"p-4"}>{new Date(user.created_at).toLocaleString()}</td>
                            <td scope={"col"} className={"p-4"}>{user.user.role}</td>
                            <td scope={"col"} className={"p-4"}>
                                <button
                                    onClick={() => deleteUser(user.user.id)}
                                    className={"bg-red-500 px-2.5 py-1 rounded-lg text-white"}>
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Users;
