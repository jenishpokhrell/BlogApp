// import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
// import { IGetBlogDto } from "../../types/blog.types";
// import axiosInstance from "../../utils/axiosInstance";
// import { BLOGS_URL } from "../../utils/globalConfig";

const Blogs = () => {

    // const [allBlogs, setAllBlogs] = useState<IGetBlogDto[]>([]);
    // const [loading, setLoading] = useState(false);

    // const fetchBlogs = async () => {
    //     try{
    //         setLoading(true);
    //         const response = await axiosInstance.get<IGetBlogDto[]>(BLOGS_URL);
    //         const { data } = response
    //         setAllBlogs(data)
    //         setLoading(false)
    //     }catch(error){
    //         alert('An error happened')
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     fetchBlogs
    // }, [])

    return (
        <div className=" home w-full">
            <Navbar />
            {/* {fetchBlogs.map((item) => { */}
            <div className=" w-3/4 p-10 my-20 mx-40 border">
                <div>
                    <h1 className=" text-[35px] font-semibold">ASP.NET 9 Features</h1>
                </div>
                <div className=" flex items-center mb-10 font-light">
                    <p className="mr-24">Jenish Pokhrel</p>
                    <p>July 24th, 2024</p>
                </div>
                <div className=" text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium veniam commodi repudiandae quaerat! Quisquam, expedita, iste possimus cumque voluptatum, aperiam sequi veritatis corrupti quia illum numquam ratione. Quod amet dicta optio recusandae adipisci natus ex earum dolores quasi? Quidem, unde!
                </div>
                <div className='mt-10'>
                    <button type="button" className=' w-40'>Read More</button>
                </div>
            </div>
            {/* })} */}
        </div>
    )
}

export default Blogs;