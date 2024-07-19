
import image1 from '../../assets/1.png'

const HomePage = () => {
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
                <button type="button" className=' w-72'>Login</button>
            </div>
            <div className='pl-28'>
                <button type="button" className=' w-72'>SignUp</button>
            </div>
        </div>
    </div>
  )
}

export default HomePage