import { LuUserCircle } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
// import useAuth from "../hooks/useAuth.hook";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { IAuthUser } from "../types/auth.types";
import { USERS_URL } from "../utils/globalConfig";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Navbar = () => {

    const [fName, setFName] = useState('')
    const redirect = useNavigate();

    const fetchFirstName = async () => {
        try {
            const response = await axiosInstance.get<IAuthUser[]>(USERS_URL)
            const { data } = response;
            if(Array.isArray(data) && data.length > 0){
                const user = data[0]
                const name = `${user.firstName}`;
                setFName(name)
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Couldn't fetch the data",
            });
            redirect('/login')
        }
    }

    useEffect(() => {
        fetchFirstName()
    }, [])

    return (
        <div className=" h-[10vh] bg-black flex justify-between items-center">
            <div className="ml-20">
                <h1 className=" text-white text-3xl font-bold">Blog App</h1>
            </div>
            <div>
                <nav>
                    <ul className=" text-white flex mr-16 ">
                        <li className="m-4 cursor-pointer flex items-center font-[350]"><IoMdAdd size={26}/> <span className="ml-1">Post</span></li>
                        <li className="m-5 cursor-pointer"><IoNotificationsOutline size={26}/></li>
                        <li className="m-4 cursor-pointer flex items-center justify-between font-[350]">
                            <LuUserCircle size={26}/><span className="ml-3">{fName}</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar