import { LuUserCircle } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
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
                            <LuUserCircle size={26}/> <span className="ml-3"></span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar