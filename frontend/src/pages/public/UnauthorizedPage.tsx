import { MdOutlineNotAccessible } from "react-icons/md";
import { PATH_PUBLIC } from "../../routes/path";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="home text-center pt-[15%]">
            <div className=" ml-[48%] mb-5">
                <MdOutlineNotAccessible size={50} />
            </div>
            <div className="mb-6 text-wrap">
                <h1 className=" text-[2.5rem] font-bold">You are not authorized to access this page</h1>
            </div>
            <div className=" flex justify-center mb-6">
                <p>Sorry, you don't have the necessary permissions to view this content.</p>
                <span className=" pl-1 font-bold"> Try logging in first</span>
            </div>
            <div>
                <Link to={PATH_PUBLIC.home}>
                    <button type="button" className=' w-60'>Back to homepage</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage;