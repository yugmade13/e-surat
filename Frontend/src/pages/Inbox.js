import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from "../style";
import {useDispatch, useSelector} from "react-redux";
import {GetMe} from "../features/authSlice";
import axios from "axios";

const Inbox = () => {
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);

    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const response = await axios.get("http://localhost:3300/orders");
        return response.data;
    }

    useEffect(() => {
        if (user) {
            if (user.role === "admin") {
                navigate("/");
            }
        }
    }, [navigate, user]);

    useEffect(() => {
        getOrders()
            .then((orders) => setOrders(orders))
            .catch((error) => console.log(error));
    }, []);

    return (
        <section className={`bg-gray-50 h-screen ${styles.flexStart}`}>
            <div className={`${styles.boxWidthSmall}`}>
                <div className={"py-10 px-6"}>
                    <div className={"w-full bg-white h-10px py-6 rounded-t-xl"}>
                        <h3 className={"font-poppins font-semibold text-[22px] text-center"}>Surat Terkirim</h3>
                    </div>
                    <div className={"overflow-x-auto"}>
                        {orders.length
                            ? (
                                <table className={"w-full bg-white text-sm text-left font-poppins"}>
                                    <thead>
                                    <tr>
                                        <th scope={"col"} className={"p-4 min-w-[300px]"}>Nama Surat</th>
                                        <th scope={"col"} className={"p-4 min-w-[300px]"}>Penerima</th>
                                        <th scope={"col"} className={"p-4 min-w-[100px]"}>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.map((order,index) => (
                                        <tr key={index} className={"border-y hover:shadow hover:bg-gray-50"}>
                                            <th scope={"col"} className={"p-4"}>
                                                {order.letter
                                                    ? order.letter.name
                                                    : <p className={"text-red-500"}>Jenis surat telah dihapus</p>
                                                }
                                            </th>
                                            <td scope={"col"} className={"p-4"}>{order.user.user_profile.name}</td>
                                            <td scope={"col"} className={"p-4"}>
                                                <a
                                                    href={order.url}
                                                    download
                                                    className={"bg-blue-500 px-2.5 py-1 rounded-lg text-white"}>
                                                    Download
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className={"bg-white text-center font-poppins"}>Belum ada kotak masuk</div>
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

export default Inbox;
