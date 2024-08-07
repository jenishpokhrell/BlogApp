import useAuth from "../hooks/useAuth.hook"
import Navbar from "./Navbar"
import { FaRegUser } from "react-icons/fa";
import { RiArticleFill } from "react-icons/ri";
import { IoLibrarySharp } from "react-icons/io5";

const Sidebar = () => {

    const { user: currentUser } = useAuth()

    return (
        <div className=" overflow-hidden">
            <Navbar />
            <div className=" home w-[20%] bg-gray-100">
                <div className=" flex justify-center bg-slate-300 rounded-full h-20 w-20 py-10 items-center relative top-16 border mx-auto">
                    <h2 className=" font-bold text-2xl">{currentUser?.firstName.charAt(0)}</h2>
                </div>
                <div>
                    <h1 className=" text-center px-10 mt-24 mb-7 text-3xl font-bold">Hello, {currentUser?.firstName}</h1>
                </div>
                <hr />
                <div className="">
                    <div className=" flex justify-center items-center w-full cursor-pointer hover:bg-gray-200 transition-all">
                        <FaRegUser size={18} className=" mr-10"/>
                        <h2 className=" text-1xl py-2 m-1">Details</h2>
                    </div>
                    <hr />
                    <div className=" flex justify-center items-center w-full cursor-pointer hover:bg-gray-200 transition-all">
                        <RiArticleFill size={18} className=' mr-5'/>
                        <h2 className=" text-1xl py-2 ml-8 m-1">Blogs</h2>
                    </div>
                    <hr />
                    <div className=" flex justify-center items-center w-full cursor-pointer hover:bg-gray-200 transition-all">
                        <IoLibrarySharp size={18} className=" mr-5"/>
                        <h2 className=" text-1xl py-2 ml-5 m-1">Libraries</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sidebar