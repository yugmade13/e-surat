import React, {useState} from 'react';

const Delete = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            {show && (
                <div className={"absolute w-full bg-transparent font-poppins"}>
                    <div className={"h-screen flex justify-center items-center"}>
                        <div className={"flex flex-col bg-white shadow-lg px-4 py-6 max-w-[400px] rounded-lg"}>
                            <div className={"flex"}>
                                <svg className="w-12 fill-current text-red-500" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0V0z" fill="none"/>
                                    <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
                                </svg>
                                <div className={"ml-3"}>
                                    <h2 className="font-semibold text-gray-800">Hapus</h2>
                                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                        Apakah anda yakin ingin menghapus ini?
                                    </p>
                                </div>
                            </div>
                            <div className={"flex items-center mt-3"}>
                                <button
                                    className={"flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"}>
                                    Batal
                                </button>
                                <button
                                    className={"flex-1 px-4 py-2 ml-2 bg-red-500 hover:bg-red-700 text-white text-sm font-medium rounded-md"}>
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Delete;
