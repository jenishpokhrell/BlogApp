
import { Link } from 'react-router-dom'
import image1 from '../../assets/1.png'
import { PATH_MAIN, PATH_PUBLIC } from '../../routes/path'
// import Footer from './Footer'
// import { useNavigate } from 'react-router-dom'

const HomePage = () => {

    // const redirect = useNavigate()

    return (
        <div className=' home flex justify-evenly items-center'>
            <div className=''>
                <img src={image1} alt="blogImage" width={700} />
            </div>
            <div className=''>
                <div className=' mb-10'>
                    <h1>Welcome To Blog App</h1>
                </div>
                <div className='mb-7 pl-28'>
                    <Link to={PATH_PUBLIC.login}><button type="button" className='w-72'>Login</button></Link>
                </div>
                <div className='pl-28'>
                    <Link to={PATH_PUBLIC.register}>
                        <button type="button" className=' w-72'>SignUp</button>
                    </Link>
                </div>
                <div>
                    {/* <Link to={PATH_PUBLIC.notFound}>
                        <p>Not Found</p>
                    </Link>
                    <Link to={PATH_PUBLIC.unauthorized}>
                        <p>No Auth</p>
                    </Link> */}
                    {/* <Link to={PATH_MAIN.blogs}>
                        <p>Go to Blog Page</p>
                    </Link> */}
                </div>
            </div>
            {/* <Footer/> */}
        </div>
    )
}

export default HomePage