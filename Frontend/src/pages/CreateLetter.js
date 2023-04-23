import React, {useEffect, useState} from 'react';
import styles from "../style";
import FormCreateLetterOne from "../components/FormCreateLetterOne";
import FormCreateLetterTwo from "../components/FormCreateLetterTwo";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {GetMe} from "../features/authSlice";

const CreateLetter = () => {
    const [tabs, setTabs] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isError} = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(GetMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            navigate("/login");
        }
    }, [navigate, isError]);

    const handleTabs = (index) => {
        setTabs(index);
    }

    return (
        <section className={`bg-white ${styles.flexStart}`}>
            <div className={`${styles.boxWidthSmall}`}>
                <div className={"py-10 px-6"}>
                    <div className={"flex justify-start gap-4 mb-10"}>
                        <button
                            onClick={() => handleTabs(1)}
                            className={`${tabs === 1 ? "border-black border-b-[2px]" : ""} font-poppins text-primary text-[16px] pb-2`}>
                            Buat Surat
                        </button>
                        <button
                            onClick={() => handleTabs(2)}
                            className={`${tabs === 2 ? "border-black border-b-[2px]" : ""} font-poppins text-primary text-[16px] pb-2`}>
                            Buatkan Untuk Orang
                        </button>
                    </div>
                    <div className={"w-full"}>
                        <div className={`${tabs === 1 ? "block" : "hidden"}`}>
                            <FormCreateLetterOne />
                        </div>
                        <div className={`${tabs === 2 ? "block" : "hidden"}`}>
                            <FormCreateLetterTwo />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateLetter;
