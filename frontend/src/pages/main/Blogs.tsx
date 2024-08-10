import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { IGetBlogDto } from "../../types/blog.types";
import axiosInstance from "../../utils/axiosInstance";
import { BLOGS_URL } from "../../utils/globalConfig";
import { FaRegComment } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CiSaveDown2 } from "react-icons/ci";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import useAuth from "../../hooks/useAuth.hook";

const Blogs = () => {

    const [allBlogs, setAllBlogs] = useState<IGetBlogDto[]>([]);
    const [open, setOpen] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { user: currentUser } = useAuth()

    const redirect = useNavigate();

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<IGetBlogDto[]>(BLOGS_URL);
            const { data } = response
            setAllBlogs(data)
            setLoading(false)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Couldn't fetch the data",
            });
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const handleClick = (id: string) => {
        if (open === id) {
            setOpen(null)
        } else {
            setOpen(id)
        }
    }

    const handleReadMore = (id: string) => {
        redirect(`/main/blog/${id}`)
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown')) {
                setOpen(null);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className=" home w-full">
            <Navbar />
            {allBlogs.map((item) => (
                <div key={item.id} className=" w-3/5 p-10 my-20 mx-auto border hover:opacity-100">
                    <div className=" flex justify-between items-center">
                        <h1 className=" text-[35px] font-semibold">{item.blogTitle}</h1>
                        <div className=" relative dropdown">
                            <HiOutlineDotsHorizontal size={25} className=" cursor-pointer" onClick={() => handleClick(item.id)} />
                            {open === item.id && (
                                <div className="absolute -right-5 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                    <ul className="py-1">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <CiSaveDown2 className="inline mr-2" />
                                            Save to Library
                                        </li>
                                        {item.postedBy === currentUser?.username && (
                                            <>
                                            
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                            <CiEdit className="inline mr-2" />
                                            Edit
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                                            <MdDeleteOutline className="inline mr-2" />
                                            Delete
                                        </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className=" flex justify-between items-center mb-10 font-light">
                        <p className="mr-24 mt-2 text-[20px]">{item.postedBy}</p>
                        <p className=" font-semibold italic">Posted: {new Date(item.createdAt).toDateString()}</p>
                    </div>
                    <div className=" text-justify">
                        {item.description}
                    </div>
                    <div className=" w-[140px] flex items-center mt-5 cursor-pointer">
                        <FaRegComment size={20} /> <p className=" pl-2 text-[17px] font-light" onClick={() => handleReadMore(item.id)}>{item.comments.length > 1 ? `${item.comments.length} comments` : `${item.comments.length} comment`}</p>
                    </div>
                    <div className='mt-10'>
                        <button type="button" className=' w-40' onClick={() => handleReadMore(item.id)}>Read More</button>
                    </div>
                </div>
            ))}
            <Footer />
        </div>
    )
}

export default Blogs;