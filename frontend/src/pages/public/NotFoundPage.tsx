import { TiWarningOutline } from "react-icons/ti";
import { PATH_PUBLIC } from "../../routes/path";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="home text-center pt-[15%]">
            <div className=" ml-[48%] mb-5">
                <TiWarningOutline size={50} />
            </div>
            <div className="mb-6">
                <h1 className=" text-[2.5rem] font-bold">Oops, page not found!</h1>
            </div>
            <div className="mb-6">
                <p>The page you're looking for doesn't exist or has been removed.</p>
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