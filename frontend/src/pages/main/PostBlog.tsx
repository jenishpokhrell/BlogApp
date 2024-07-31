import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { IPostBlogDto } from '../../types/blog.types';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const PostBlog = () => {

  const [loading, setLoading] = useState(false);
  // const [postBlog, setPostBlog] = useState<IPostBlogDto[]>([])

  const postBlogSchema = Yup.object().shape({
    blogTitle: Yup.string().required('Username is required'),
    description: Yup.string().required('Password is required')
})

  const {
    control,
    handleSubmit,
    formState : { errors }
  } = useForm<IPostBlogDto>({
    resolver: yupResolver(postBlogSchema),
      defaultValues: {
        blogTitle: '',
        description: ''
      }
  })

  const onSubmitPost = async (data: IPostBlogDto) => {
    try {
        setLoading(false);
        
    } catch (error) {
      
    }
  }

  return (
    <div>
        <div className=' text-center mt-20'>
            <h1 className=' text-3xl font-bold' >POST BLOG</h1>
        </div>
        <div className='flex justify-center mt-20 drop-shadow-2xl'>
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