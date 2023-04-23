import React from 'react';
import Delete from "../components/Delete";
import styles from "../style";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <section className={`bg-white ${styles.flexStart}`}>
            <Delete />
            <div className={`${styles.boxWidthSmall}`}>
                <div className={"py-16 px-6"}>
                    <div className='flex flex-col w-full'>
                        <h1 className='flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] ss:leading-[100.8px] leading-[75px]'>
                            Sekarang<br className='sm:block hidden'/>{' '}
                            <span className='text-gradient'>Membuat Surat</span>{' '}
                        </h1>
                        <h1 className='font-poppins font-semibold ss:text-[68px] text-[52px]  ss:leading-[100.8px] leading-[75px] w-full'>
                            Semakin Mudah.
                        </h1>
                    </div>
                    <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                        Buat surat di Desa Kadilangu anti ribet.
                        Nggak perlu modar - mandir ke kantor desa, tinggal klik langsung jadi!
                    </p>
                    <Link
                        className={"inline-block font-poppins font-bold text-[16px] py-3 px-5 mt-8 bg-primary text-white rounded-full sm:text-[28px] px-8"}
                        to={"/new"}>Buat Surat</Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
