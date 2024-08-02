import { LuUserCircle } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PATH_MAIN } from "../routes/path";
import axiosInstance from "../utils/axiosInstance";
import { IInfoForUsers } from "../types/auth.types";
import { INFO_FOR_USERS_URL } from "../utils/globalConfig";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth.hook";
import DropDown from "./DropDown";

const Navbar = () => {

    // const [fName, setFName] = useState('');
    const { user: currentUser} = useAuth();
    const [openProfile, setOpenProfile] = useState(false)

    const fetchFirstName = async () => {
        try {
            const response = await axiosInstance.get<IInfoForUsers[]>(INFO_FOR_USERS_URL)
            const { data } = response;
            console.log(data)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Couldn't fetch the data",
            });
        }
    }

    useEffect(() => {
        fetchFirstName()
    }, [])

    return (
        <div className=" h-[10vh] bg-black flex justify-between items-center">
            <div className="ml-20 cursor-pointer">
                <Link to={PATH_MAIN.blogs}>
                    <h1 className=" text-white text-3xl font-bold">Blog App</h1>
                </Link>
            </div>
            <div>
                <nav>
                    <ul className=" text-white flex mr-16 ">
                        <Link to={PATH_MAIN.postBlog}>
                            <li className="m-5 border cursor-pointer flex items-center font-[350]"><IoMdAdd size={26}/> <span className="ml-1">Post</span></li>
                        </Link>
                        <Link to={PATH_MAIN.notifications}>
                            <li className="m-5 cursor-pointer"><IoNotificationsOutline size={26}/></li>
                        </Link>
                        <li className="m-4 cursor-pointer flex items-center justify-between font-[350] transition-all" onClick={() => setOpenProfile((prev) => !prev)}>
                            <LuUserCircle size={26}/><span className="ml-3">{currentUser ? currentUser.username : "User"}</span>
                        </li>
                        {
                            openProfile &&  (
                                <DropDown/>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </div>
    )

}

export default Navbar