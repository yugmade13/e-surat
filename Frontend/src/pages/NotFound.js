import React from 'react';
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <section className={"w-full h-screen flex flex-col justify-center items-center"}>
            <div className={"font-poppins flex flex-col items-center gap-1 lg:text-[22px]"}>
                <p>Oops!</p>
                <h2 className={"text-[32px] font-bold lg:text-[36px]"}>404</h2>
                <p>Sorry, page not found</p>
            </div>
            <Link
                className={"font-poppins underline text-blue-600 mt-8"}
                to={"/"}>
                Go Home
            </Link>
        </section>
    );
};

export default NotFound;
