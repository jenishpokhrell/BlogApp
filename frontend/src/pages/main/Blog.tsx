import Footer from '../../components/Footer'
import user from '../../assets/user-circles-set.png'
// import { FaRegComment } from 'react-icons/fa6'
import { CiSaveDown2 } from 'react-icons/ci'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import Navbar from '../../components/Navbar'
import { Controller } from 'react-hook-form'
import { IGetBlogDto } from '../../types/blog.types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import {BLOGS_URL, GET_BLOG_URL } from '../../utils/globalConfig'
import Swal from 'sweetalert2'

const Blog = () => {

    const { id } = useParams<{ id: string }>()
    const [blog, setBlog] = useState<IGetBlogDto | null>(null)
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState('')
    // const [comments, setComments] = useState<string[]>([])

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<IGetBlogDto>(GET_BLOG_URL.replace('{id}', id!))
            // console.log(response)
            setBlog(response.data)
            // setComments(response.data.comments)
            setLoading(false)
            // console.log(comment)
        } catch (error) {
            console.error('Error fetching blog:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong! Couldn't fetch the data",
            });
            setLoading(false);
        }
    }

    useEffect(() => {
        // console.log(id)
        fetchBlog()
    }, [id])

    return (
        <div className=" home w-full">
            <Navbar />
            {loading ? (
                <p>Loading...</p>
            ) : (blog && (
                <div>
                    <div className=" w-3/5 p-10 mt-20 mx-auto border hover:opacity-100">
                        <div className=" flex justify-between items-center">
                            <h1 className=" text-[35px] font-semibold">{blog.blogTitle}</h1>
                            <HiOutlineDotsHorizontal size={25} className=" cursor-pointer" />
                        </div>
                        <div className="hidden z-10">
                            <div className=" w-[160px] p-1 bg-zinc-50 flex items-center justify-center relative left-[81%] cursor-pointer hover:scale-125 transition-all">
                                <CiSaveDown2 size={25} className=" ml-1" /><p className="ml-3">Save to library</p>
                            </div>
                        </div>
                        <div className=" flex justify-between items-center mb-10 font-light">
                            <p className="mr-24 mt-2 text-[20px]">{blog.postedBy}</p>
                            <p className=" font-semibold italic">Posted: {new Date(blog.createdAt).toDateString()}</p>
                        </div>
                        <div className=" text-justify">
                            {blog.description}
                        </div>
                    </div>
                    <div className=' w-3/5 my-10 mx-auto'>
                        <div>
                            <h2 className='text-[30px] font-semibold'>Comments</h2>
                        </div>
                        <div className='border mt-5'>
                            <div className=' flex items-center '>
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
                                {blog.comments.map((comment, index) => (
                            <div className=' mt-5 mb-10 flex items-center'>
                                <div className=' ml-10 border border-y-2 border-x-2 rounded-full w-13 h-13 bg-gray-200'>
                                    <img src={user} alt="user" width={55} />
                                </div>
                                <div key={index} className=' ml-5 p-2'>
                                    <div>
                                        <p className=' mr-10 font-semibold'>{comment.commentor}</p>
                                        {/* <p className=' italic'>Commented on: {new Date(item.createdAt).toDateString()}</p> */}
                                    </div>
                                    <div className=' mt-2'>
                                        <p className=' font-light'>{comment.comments}</p>
                                    </div>
                                </div>
                            </div>
                                    ))}
                        </div>
                    </div>
                </div>
            ))}
            <Footer />
        </div>
    )
}

export default Blog