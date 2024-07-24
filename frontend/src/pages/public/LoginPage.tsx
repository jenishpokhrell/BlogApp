import { Link } from 'react-router-dom'
import image2 from '../../assets/2.png'
import { PATH_PUBLIC } from '../../routes/path'
import { IoIosArrowBack } from 'react-icons/io'
import Footer from '../../components/Footer'

const LoginPage = () => {

    return (
        <>   
        <div className=' home flex justify-evenly items-center'>
            <div className=' ml-20'>
            <Link to={PATH_PUBLIC.home}>
                        <div className=' w-[30%] -ml-14 flex mt-10 items-center cursor-pointer hover:-translate-x-2 transition'>
                            <IoIosArrowBack className='' size={40} />
                            <p>Go back to home page</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia illo neque quae fugit velit commodi.</p>
                        </div>
                    </Link>
                <img src={image2} alt="blogImage" width={700} />
            </div>
            <div className=' h-[60%] w-[35%] mr-28 bg-gray-100 drop-shadow-2xl'>
                <div className=' relative top-10'>
                    <div className=' mb-10 text-center'>
                        <h1 className='text-3xl'>Login</h1>
                    </div>
                    <div className='relative left-28 '>
                        <div className=' mb-6 '>
                            <input type='text' placeholder='Enter your username' className='w-[320px] p-2 border' required/>
                        </div>
                        <div className='mb-10'>
                            <input type='password' placeholder='Enter your password' className='w-[320px] p-2 border' required/>
                        </div>
                        <div className='mb-7'>
                            <button type="button" className=' w-80'>Login</button>
                        </div>
                        
                        <div className=' mt-10 ml-1'>
                            <p className=''>Haven't registered yet? 
                                <Link to={PATH_PUBLIC.register}>
                                <span className=' ml-2 transition ease-in-out delay-150 text-cyan-600 cursor-pointer italic'>Create an account!</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default LoginPage