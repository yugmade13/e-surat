import React, {useState, useEffect} from 'react';
import axios from "axios";

const Report = () => {
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const getReport = async () => {
        try {
            const response = await axios.post("http://localhost:5000/letter-request-month", {
                fromDate,
                toDate
            });

            return response.data;
        } catch (error) {
            console.log(error.message)
        }
    }

    const onReport = (event) => {
        event.preventDefault();
        getReport()
            .then((data) => {
                if (data.message === "Data kosong") {
                    console.log("Tanggal masih kosong")
                } else {
                    window.open(`http://localhost:5000/${data.message}`);
                }
            })
            .catch((error) => console.log(error))
    }

    return (
        <section className={"w-full"}>
            <h4 className={"font-poppins font-semibold text-[18px] text-center mb-5"}>Cetak Laporan</h4>
            <div className={"overflow-x-auto"}>
                <div className={"px-6"}>
                    <form onSubmit={onReport}>
                        <div className={"flex flex-col lg:flex-row lg:gap-4"}>
                            <div className={"mb-4 flex-1"}>
                                <label
                                    className={"font-poppins block mb-2"}
                                    htmlFor={"dari"}>Dari Tanggal</label>
                                <input
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                                    type={"date"}
                                    id={"dari"}/>
                            </div>

                            <div className={"mb-4 flex-1"}>
                                <label
                                    className={"font-poppins block mb-2"}
                                    htmlFor={"sampai"}>Sampai Tanggal</label>
                                <input
                                    onChange={(e) => setToDate(e.target.value)}
                                    className={"w-full font-poppins border border-gray-300 text-gray bg-gray-50 p-2.5 rounded-lg"}
                                    type={"date"}
                                    id={"sampai"}/>
                            </div>
                        </div>
                        <button
                            type={"submit"}
                            className={"w-full font-poppins text-white bg-primary py-2.5 rounded-lg mb-4"}>
                            Cetak
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Report;
