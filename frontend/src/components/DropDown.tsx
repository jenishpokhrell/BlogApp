import { VscAccount } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineSave } from "react-icons/hi";
import useAuth from "../hooks/useAuth.hook";

const DropDown = () => {

    const { logout } = useAuth();
    return (
        <div className=' flex flex-col'>
            <ul className=" p-5 w-48 font-light absolute top-[4.55rem] flex flex-col gap-5 right-10 bg-black drop-shadow-2xl transition">
                <li className=' cursor-pointer hover:scale-105 transition flex gap-4 justify-center items-center'><VscAccount size={22}/> Profile</li>
                <li className=' cursor-pointer hover:scale-105 transition flex gap-4 justify-center items-center'><HiOutlineSave  size={22}/> Saved</li> <hr />
                <li className=' cursor-pointer hover:scale-105 transition flex gap-4 justify-center items-center' onClick={logout}><FiLogOut size={22}/> Logout</li>
            </ul>
        </div>
    )
}

export default DropDown