import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const DashboardSent = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const response = await axios.get("http://localhost:3300/orders");
        return response.data;
    }

    useEffect(() => {
        getOrders()
            .then((orders) => setOrders(orders))
            .catch((error) => console.log(error));
    }, [])

    return (
        <section className={"w-full"}>
            <h4 className={"font-poppins font-semibold text-[18px] text-center mb-5"}>Surat Terkirim</h4>
            <div className={"overflow-x-auto"}>
                {orders.length
                    ? (
                        <table className={"w-full bg-white text-sm text-left font-poppins"}>
                            <thead>
                            <tr>
                                <th scope={"col"} className={"p-4 min-w-[300px]"}>Nama Surat</th>
                                <th scope={"col"} className={"p-4 min-w-[300px]"}>Nama Penerima</th>
                                <th scope={"col"} className={"p-4 min-w-[300px]"}>Tanggal</th>
                                <th scope={"col"} className={"p-4 min-w-[150px]"}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order, index) => (
                                <tr key={index} className={"border-y hover:shadow hover:bg-gray-50"}>
                                    <td scope={"col"} className={"p-4"}>
                                        {order.letter
                                            ? order.letter.name
                                            : <p className={"text-red-500"}>Jenis surat telah dihapus</p>
                                        }
                                    </td>
                                    <td scope={"col"} className={"p-4"}>{order.user.user_profile.name}</td>
                                    <td scope={"col"} className={"p-4"}>{new Date(order.created_at).toLocaleString()}</td>
                                    <td scope={"col"} className={"p-4 min-w-[150px]"}>
                                        <Link
                                            to={`/dashboard/sent/edit/${order.id}`}
                                            className={"bg-blue-500 px-2.5 py-1 rounded-lg text-white"}>
                                            Detail Pengiriman
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={"text-center font-poppins"}>Belum ada surat terkirim</div>
                    )
                }
            </div>
        </section>
    );
};

export default DashboardSent;
