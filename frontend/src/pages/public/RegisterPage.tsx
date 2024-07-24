import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import image2 from '../../assets/2.png'
import { PATH_PUBLIC } from '../../routes/path'
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { IRegisterDto } from '../../types/auth.types';
import { yupResolver } from '@hookform/resolvers/yup'
import useAuth from '../../hooks/useAuth.hook';
import { useState } from 'react';
import Swal from 'sweetalert2';

const RegisterPage = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const { register } = useAuth()

    const registerSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last name is required'),
        userName: Yup.string().required('User name is required'),
        email: Yup.string().required('Email is required').email('Email must be valid'),
        address: Yup.string().required('Address is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must have atleast 8 characters')
    })

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterDto>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            address: '',
            password: '',
        },
    })

    const onSubmitRegisterForm = async (data: IRegisterDto) => {
        try{
            setLoading(true);
            await register(data.firstName, data.lastName, data.userName,  data.email, data.address, data.password)
            setLoading(false)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User Created Successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }catch(error){
            setLoading(false)
            const err = error as { data: string; status: number}
            const {status, data} = err;
            if(status === 400 || status === 409){
                console.error(data)
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "An error occured. Please contact Admin!",
                });
            }
        }
    }

    return (
        <>
            <div className='home flex justify-evenly items-center'>
                <div className=' ml-20'>
                    <Link to={PATH_PUBLIC.home}>
                        <div className=' w-[30%] -ml-14 flex mt-10 items-center cursor-pointer hover:-translate-x-2 transition'>
                            <IoIosArrowBack className='' size={40} />
                            <p>Go back to home page</p>
                        </div>
                    </Link>
                    <img src={image2} alt="blogImage" width={700} />
                </div>
                <div className=' h-[90%] w-[38%] mr-28 bg-gray-100 drop-shadow-2xl'>
                    <div className=' relative top-10'>
                        <div className=' mb-10 text-center'>
                            <h1 className='text-3xl'>Register</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitRegisterForm)}>
                            <div className='relative left-32'>
                                <div className=' mb-6'>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        rules={{ required: 'First name is required' }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type='text'
                                                placeholder='Enter your first name'
                                                className='w-[320px] p-2 border'
                                            />
                                        )}
                                    />
                                    {errors.firstName && <span>{errors.firstName.message}</span>}
                                </div>
                                <div className='mb-6'>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        rules={{ required: 'Last name is required' }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type='text'
                                                placeholder='Enter your last name'
                                                className='w-[320px] p-2 border'
                                            />
                                        )}
                                    />
                                    {errors.lastName && <span>{errors.lastName.message}</span>}
                                </div>
                                <div className='mb-6'>
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
                                    {errors.userName && <span>{errors.userName.message}</span>}
                                </div>
                                <div className='mb-10'>
                                    <div className='mb-6'>
                                        <Controller
                                            name="email"
                                            control={control}
                                            rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type='email'
                                                    placeholder='Enter your email'
                                                    className='w-[320px] p-2 border'
                                                />
                                            )}
                                        />
                                        {errors.email && <span>{errors.email.message}</span>}
                                    </div>
                                    <div className='mb-6'>
                                        <Controller
                                            name="address"
                                            control={control}
                                            rules={{ required: 'Address is required' }}
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type='text'
                                                    placeholder='Enter your address'
                                                    className='w-[320px] p-2 border'
                                                />
                                            )}
                                        />
                                        {errors.address && <span>{errors.address.message}</span>}
                                    </div>
                                    <div className='mb-6'>
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
                                </div>
                                <div className='mb-7'>
                                    <button type='submit' className=' w-80' onClick={() => { }}>Sign up</button>
                                </div>

                                <div className=' mt-8 ml-8'>
                                    <p className=''>Already have an account?
                                        <Link to={PATH_PUBLIC.login}>
                                            <span className=' ml-2 transition ease-in-out delay-150 text-cyan-600 cursor-pointer italic'>Sign In!</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RegisterPage
