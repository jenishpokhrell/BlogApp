import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IGetBlogDto, IUpdateBlogDto } from '../../types/blog.types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import axiosInstance from '../../utils/axiosInstance';
import { EDIT_BLOGS_URL, GET_BLOG_URL } from '../../utils/globalConfig';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_MAIN } from '../../routes/path';
import Navbar from '../../components/Navbar';

const EditBlog = () => {

    const { id } = useParams<{id: string}>();
    const redirect = useNavigate()

    console.log('Blog ID:', id);

    const editBlogSchema = Yup.object().shape({
        blogTitle: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required')
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUpdateBlogDto>({
        resolver: yupResolver(editBlogSchema),
        defaultValues: {
            blogTitle: '',
            description: ''
        }
    })

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axiosInstance.get<IGetBlogDto>(`${GET_BLOG_URL}/${id}`)
                const blogData = response.data;
                console.log("Fetched Data: " , blogData)
                reset({
                    blogTitle: blogData.blogTitle,
                    description: blogData.description
                });
            } catch (error) {
                console.error('Error fetching blog data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch the blog data. Please try again.',
                });
            }
        }
        if(id){
            fetchBlog();
        }
    }, [id, reset])

    const onSubmit = async (data: IUpdateBlogDto) => {
        try {
            await axiosInstance.put(`${EDIT_BLOGS_URL}/${id}`, {
                blogTitle: data.blogTitle,
                description: data.description,
            })
            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Your blog has been updated successfully.",
            });
            redirect(PATH_MAIN.blogs)
        } catch (error) {
            console.error("Error updating blog: " , error)
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update the blog. Please try again.",
            });
        }
    }

    return (
        <div>
            <Navbar/>
            <div className=' text-center mt-16'>
                <h1 className=' text-3xl font-bold' >EDIT BLOG</h1>
            </div>
            <div className='flex justify-center mt-10 drop-shadow-2xl'>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                        <div className=' mb-6 '>
                            <Controller
                                name="blogTitle"
                                control={control}
                                rules={{ required: 'Title is required' }}
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
                            <button type='submit' className=' w-80' onClick={() => { }}>Update</button>
                        </div>
                </div>

                </form>
                    </div>
            </div>
    )
}

export default EditBlog