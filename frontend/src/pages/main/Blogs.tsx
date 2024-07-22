import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { IGetBlogDto } from "../../types/blog.types";
import axiosInstance from "../../utils/axiosInstance";
import { BLOGS_URL } from "../../utils/globalConfig";
import { FaRegComment } from "react-icons/fa6";
import Footer from "../../components/Footer";

const Blogs = () => {

    const [allBlogs, setAllBlogs] = useState<IGetBlogDto[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBlogs = async () => {
        try{
            setLoading(true);
            const response = await axiosInstance.get<IGetBlogDto[]>(BLOGS_URL);
            const { data } = response
            setAllBlogs(data)
            setLoading(false)
        }catch(error){
            alert('An error happened')
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className=" home w-full">
            <Navbar />
            {allBlogs.map((item) => (
                <div key={item.id} className=" w-3/4 p-10 my-20 mx-40 border">
                    <div>
                        <h1 className=" text-[35px] font-semibold">{item.blogTitle}</h1>
                    </div>
                    <div className=" flex justify-between items-center mb-10 font-light">
                        <p className="mr-24 mt-2 text-[20px]">{item.postedBy}</p>
                        <p className=" font-semibold italic">Posted: {new Date(item.createdAt).toDateString()}</p>
                    </div>
                    <div className=" text-justify">
                        {item.description}
                    </div>
                    <div className=" w-[120px] flex items-center mt-5 cursor-pointer">
                       <FaRegComment size={20}/> <p className=" pl-2 text-[17px] font-light">{item.comments.length} comment</p>
                    </div>
                    <div className='mt-10'>
                        <button type="button" className=' w-40'>Read More</button>
                    </div>
                </div>
            ))}
            <Footer/>
        </div>
    )
}

export default Blogs;