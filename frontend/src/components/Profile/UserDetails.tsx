import useAuth from "../../hooks/useAuth.hook"

const UserDetails = () => {

    const { user: currentUser } = useAuth()

    return (
        <div className="w-[100%] p-16 ml-32 ">
            <div>
                <div className="flex justify-center bg-slate-300 rounded-full h-28 w-28 py-10 items-center
                    border">
                    <h2 className=" font-bold text-2xl">{currentUser?.firstName.charAt(0)}</h2>
                </div>
            </div>
            <div className=" relative top-10">
                <div className=" mb-5">
                    <h2 className=" text-2xl font-bold">UserName </h2>
                    <p className=" text-[20px]">{currentUser?.username}</p>
                </div>
                <div className=" mb-5">
                    <h2 className=" text-2xl font-bold">Name </h2>
                    <p className=" text-[20px]">{currentUser?.firstName} {currentUser?.lastName}</p>
                </div>
                <div className=" mb-5">
                    <h2 className=" text-2xl font-bold">Email Address </h2>
                    <p className=" text-[20px]">{currentUser?.email}</p>
                </div>
                <div className=" mb-5">
                    <h2 className=" text-2xl font-bold">Address</h2>
                    <p className=" text-[20px]">{currentUser?.address ? currentUser.address : 'No Address Provided'}</p>
                </div>
                

            </div>
        </div>
    )
}

export default UserDetails