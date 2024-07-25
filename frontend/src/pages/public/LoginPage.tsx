import { Link } from 'react-router-dom'
import image2 from '../../assets/2.png'
import { PATH_PUBLIC } from '../../routes/path'
import { IoIosArrowBack } from 'react-icons/io'
import Footer from '../../components/Footer'
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form'
import { ILoginDto } from '../../types/auth.types'
import { yupResolver } from '@hookform/resolvers/yup'
import useAuth from '../../hooks/useAuth.hook'
import { useState } from 'react'
import Swal from 'sweetalert2'

const LoginPage = () => {

    const [loading, setLoading] = useState(false)
    const { login } = useAuth();

    const loginSchema = Yup.object().shape({
        userName: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    })

    const {
        control,
        handleSubmit,
        formState : { errors }
    } = useForm<ILoginDto>({
        resolver: yupResolver(loginSchema),
            defaultValues: {
                userName: '',
                password: ''
            }
    })

    const onSubmitLoginForm = async (data: ILoginDto) => {
        try{
            setLoading(true);
            await login(data.userName, data.password)
            setLoading(false)
        }catch(error){
            setLoading(false)
            const err = error as { data: string, status: number}
            const { status } = err
            if(status === 401){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid Username or Password",
                });
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occured. Please contact admin!",
                });
            }
        }
    }

    return (
        <>
            <div className=' home flex justify-evenly items-center'>
                <div className=' ml-20'>
                    <Link to={PATH_PUBLIC.home}>
                        <div className=' w-[35%] -ml-14 flex mt-10 items-center cursor-pointer hover:-translate-x-2 transition'>
                            <IoIosArrowBack className='' size={40} />
                            <p>Go back to home page</p>
                        </div>
                    </Link>
                    <img src={image2} alt="blogImage" width={700} />
                </div>
                <div className=' h-[60%] w-[35%] mr-28 bg-gray-100 drop-shadow-2xl'>
                    <div className=' relative top-10'>
                        <div className=' mb-10 text-center'>
                            <h1 className='text-3xl'>Login</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitLoginForm)}>
                            <div className='relative left-28 '>
                                <div className=' mb-6 '>
                                    <Controller
                                        name="userName"
                                        control={control}
                                        rules={{ required: 'Username is required' }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type='text'
                                                placeholder='Enter your username'
                                                className='w-[320px] p-2 border'
                                            />
                                        )}
                                    />
                                    {errors.userName && <span>{errors.userName.message}</span>}                        </div>
                                <div className='mb-10'>
                                    <Controller
                                        name="password"
                                        control={control}
                                        rules={{ required: 'Password is required' }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type='password'
                                                placeholder='Enter your password'
                                                className='w-[320px] p-2 border'
                                            />
                                        )}
                                    />
                                    {errors.password && <span>{errors.password.message}</span>}                        
                                </div>
                                <div className='mb-7'>
                                    <button type='submit' className=' w-80' onClick={() => { }}>Login</button>
                                </div>

                                <div className=' mt-10'>
                                    <p className=''>Haven't registered yet?
                                        <Link to={PATH_PUBLIC.register}>
                                            <span className=' ml-2 transition ease-in-out delay-150 text-cyan-600 cursor-pointer italic'>Create an account!</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LoginPage