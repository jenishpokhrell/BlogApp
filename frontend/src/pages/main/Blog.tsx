import Footer from '../../components/Footer'
import user from '../../assets/user-circles-set.png'
// import { FaRegComment } from 'react-icons/fa6'
import { CiEdit, CiSaveDown2 } from 'react-icons/ci'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import Navbar from '../../components/Navbar'
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { IComment, IGetBlogDto } from '../../types/blog.types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { COMMENT_URL, GET_BLOG_URL } from '../../utils/globalConfig'
import Swal from 'sweetalert2'
import { IPostCommentDto } from '../../types/comment.types'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdDeleteOutline } from 'react-icons/md'

const Blog = () => {

    const { id } = useParams<{ id: string }>()
    const [blog, setBlog] = useState<IGetBlogDto | null>(null)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState<string | null>(null)

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get<IGetBlogDto>(GET_BLOG_URL.replace('{id}', id!))
            setBlog(response.data)
            setLoading(false)
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
        fetchBlog();
    }, [id])


    const commentSchema = Yup.object().shape({
        comments: Yup.string().required('Comment field cannot be empty'),
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IPostCommentDto>({
        resolver: yupResolver(commentSchema),
        defaultValues: {
            comments: ''
        }
    })

    const onSubmitPost = async (data: IPostCommentDto) => {
        try {
            const response = await axiosInstance.post<IComment>(COMMENT_URL.replace(`{blogId}`, id!), data);
            console.log('Response from POST comment:', response.data);
            if (blog) {
                setBlog({
                    ...blog,
                    comments: [...blog.comments, response.data]
                })
            }
            reset();
        } catch (error) {
            console.error('Error posting comment: ', error)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something went wrong! Couldn't post the comment",
            });
        }
    }

    useEffect(() => {
        onSubmitPost
    }, [])

    const handleClick = (id: string) => {
        if (open === id) {
            setOpen(null)
        } else {
            setOpen(id)
        }
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
            {loading ? (
                <p>Loading...</p>
            ) : (blog && (
                <div>
                    <div className=" w-3/5 p-10 mt-20 mx-auto border hover:opacity-100">
                        <div className=" flex justify-between items-center">
                            <h1 className=" text-[35px] font-semibold">{blog.blogTitle}</h1>
                            <div className=" relative dropdown">
                                <HiOutlineDotsHorizontal size={25} className=" cursor-pointer" onClick={() => handleClick(blog.id)} />
                                {open === blog.id && (
                                    <div className="absolute -right-5 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                                        <ul className="py-1">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                <CiSaveDown2 className="inline mr-2" />
                                                Save to Library
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                <CiEdit className="inline mr-2" />
                                                Edit
                                            </li>
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">
                                                <MdDeleteOutline className="inline mr-2" />
                                                Delete
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
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
                                    <img src={user} alt="user" width={35} />
                                </div>
                                <form onSubmit={handleSubmit(onSubmitPost)} className=' flex items-center'>
                                    <div className=' w-full my-10 mx-5'>
                                        <Controller
                                            name="comments"
                                            control={control}
                                            rules={{ required: 'Comment should not be empty' }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type='text'
                                                    placeholder='Add a comment'
                                                    className='w-[600px] p-2 border'
                                                />
                                            )}
                                        />
                                        {errors.comments && <span>{errors.comments.message}</span>}
                                    </div>
                                    <div className=' mr-12'>
                                        <button type='submit' className=' rounded-3xl' onClick={() => { }}>Comment</button>
                                    </div>
                                </form>
                            </div>
                            {blog.comments.map((comment, index) => (
                                <div key={comment.id || index} className=' mt-5 mb-10 flex items-center'>
                                    <div className=' ml-10 border border-y-2 border-x-2 rounded-full w-13 h-13 bg-gray-200'>
                                        <img src={user} alt="user" width={55} />
                                    </div>
                                    <div className=' ml-5 p-2'>
                                        <div>
                                            <p className=' mr-10 font-semibold'>{comment.commentor}</p>
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