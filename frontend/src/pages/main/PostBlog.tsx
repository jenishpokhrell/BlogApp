import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IPostBlogDto } from '../../types/blog.types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../utils/axiosInstance';
import { POST_BLOGS_URL } from '../../utils/globalConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { PATH_MAIN } from '../../routes/path';
import Navbar from '../../components/Navbar';

const PostBlog = () => {

    const [loading, setLoading] = useState(false);
    const redirect = useNavigate()

    const postBlogSchema = Yup.object().shape({
        blogTitle: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required')
    })

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IPostBlogDto>({
        resolver: yupResolver(postBlogSchema),
        defaultValues: {
            blogTitle: '',
            description: ''
        }
    })

    const onSubmitPost = async (data: IPostBlogDto) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(POST_BLOGS_URL, data)
            console.log(response)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Blog Posted Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
            redirect(PATH_MAIN.blogs)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occured while posting blog",
            });
        }
    }

    return (
        <div>
            <Navbar/>
            <div className=' text-center mt-16'>
                <h1 className=' text-3xl font-bold' >POST BLOG</h1>
            </div>
            <div className='flex justify-center mt-10 drop-shadow-2xl'>
                <form onSubmit={handleSubmit(onSubmitPost)}>
                    <div>
                        <div className=' mb-6 '>
                            <Controller
                                name="blogTitle"
                                control={control}
                                rules={{ required: 'Username is required' }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type='text'
                                        placeholder='Title...'
                                        className='w-[600px] p-2 border'
                                    />
                                )}
                            />
                            {errors.blogTitle && <span>{errors.blogTitle.message}</span>}                        </div>
                        <div className='mb-10'>
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: 'Content is required' }}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        // type='text'
                                        rows={10}
                                        cols={70}
                                        placeholder='Whats on your mind?'
                                        className='p-3 border'
                                    />
                                )}
                            />
                            {errors.description && <span>{errors.description.message}</span>}
                        </div>
                        <div className=' text-center'>
                            <button type='submit' className=' w-80' onClick={() => { }}>Post</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostBlog