import Footer from '../../components/Footer'
import user from '../../assets/user-circles-set.png'
// import { FaRegComment } from 'react-icons/fa6'
import { CiSaveDown2 } from 'react-icons/ci'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import Navbar from '../../components/Navbar'
import { Controller } from 'react-hook-form'
// import { IGetBlogDto } from '../../types/blog.types'
// import { useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axiosInstance from '../../utils/axiosInstance'
// import { GET_BLOG_URL } from '../../utils/globalConfig'

const Blog = () => {

    // const { id } = useParams<{id: string}>()
    // const [blog, setBlog ] = useState<IGetBlogDto | null>(null)
    // const [loading, setLoading] = useState(false)
    // const [comment, setComment] = useState('')
    // const [comments, setComments] = useState([])

    // const fetchBlog = async () => {
    //     try{
    //         setLoading(true);
    //         const response = await axiosInstance.get<IGetBlogDto>(GET_BLOG_URL)
    //         setBlog(response.data)
    //         setComments(response.data.comments)
    //     }
    // }

    return (
        <div className=" home w-full">
            <Navbar />
            {/* {allBlogs.map((item) => ( */}
            <div className=" w-3/5 p-10 mt-20 mx-auto border hover:opacity-100">
                <div className=" flex justify-between items-center">
                    <h1 className=" text-[35px] font-semibold">ASP.NET is best</h1>
                    <HiOutlineDotsHorizontal size={25} className=" cursor-pointer" />
                </div>
                <div className="hidden z-10">
                    <div className=" w-[160px] p-1 bg-zinc-50 flex items-center justify-center relative left-[81%] cursor-pointer hover:scale-125 transition-all">
                        <CiSaveDown2 size={25} className=" ml-1" /><p className="ml-3">Save to library</p>
                    </div>
                </div>
                <div className=" flex justify-between items-center mb-10 font-light">
                    <p className="mr-24 mt-2 text-[20px]">jenish_pokhrel</p>
                    <p className=" font-semibold italic">Posted: 21st July, 2024</p>
                </div>
                <div className=" text-justify">
                    {/* {item.description} */}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis soluta exercitationem iure labore assumenda nam autem ipsa nisi magnam adipisci error cumque, nobis esse vel enim fugit velit, tenetur voluptas.
                </div>
                {/* <div className=" w-[140px] flex items-center mt-5 cursor-pointer">
                            <FaRegComment size={20} /> <p className=" pl-2 text-[17px] font-light">{item.comments.length > 1 ? `${item.comments.length} comments` : `${item.comments.length} comment`}</p>
                        </div> */}
                {/* <div className='mt-10'>
                            <button type="button" className=' w-40'>Read More</button>
                        </div> */}
            </div>
            <div className=' w-3/5 my-10 mx-auto'>
                <div>
                    <h2 className='text-[30px] font-semibold'>Comments</h2>
                </div>
                <div className=' flex items-center border mt-5'>
                    <div className=' ml-10 border border-y-2 border-x-2 rounded-full w-13 h-13 bg-gray-200'>
                        <img src={user} alt="user" />
                    </div>
                    <div className=' w-full my-10 mx-5'>
                        <input type="text" placeholder=' Add a comment' className='w-[600px] p-2 border' />
                    </div>
                    <div className=' mr-12'>
                        <button className=' rounded-3xl'>Comment</button>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
            {/* ))} */}
            <Footer />
        </div>
    )
}

export default Blog