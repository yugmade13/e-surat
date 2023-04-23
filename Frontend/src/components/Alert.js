import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {resetAlert} from "../features/alertSlice";

const Alert = ({color, message}) => {
    const dispacth = useDispatch();
    const [showAlert, setShowAlert] = useState(true);

    return (
        <>
            {showAlert && (
                <div className={"px-6 py-2 my-2 border-0 rounded relative mb-4 bg-" + color + "-500"}>
                    <div className={"flex justify-between items-center"}>
                        <p className="text-white">
                            {message}
                        </p>
                        <button
                            className="text-white text-2xl font-semibold "
                            onClick={() => {
                                setShowAlert(!showAlert)
                                dispacth(resetAlert())
                            }}
                        >
                            <span>×</span>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Alert;
