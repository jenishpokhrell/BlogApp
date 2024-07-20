import image2 from '../../assets/2.png'
// import Footer from './Footer'

const LoginPage = () => {

    return (
        <div className=' home flex justify-evenly items-center'>
            <div className=''>
                <img src={image2} alt="blogImage" width={700} />
            </div>
            <div className=' h-2/4 w-2/5 bg-gray-100 border border-y-2 -ml-14'>
                <div className=' mb-10 text-center'>
                    <h1 className='text-3xl'>Login</h1>
                </div>
                <div className='place-content-center border border-y-2'>
                    <div className=' mb-6'>
                        <input type='text' placeholder='Enter your name' className='w-[320px] p-2' />
                    </div>
                    <div className='mb-10'>
                        <input type='password' placeholder='Enter your password' className='w-[320px] p-2'/>

                    </div>
                </div>
                <div className='mb-7'>
                    <button type="button" className=' w-80'>Login</button>
                </div>
            </div>

        </div>
    )
}

export default LoginPage