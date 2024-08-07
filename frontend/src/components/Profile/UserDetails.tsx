import useAuth from "../../hooks/useAuth.hook"

const UserDetails = () => {

    const { user: currentUser } = useAuth()

    return (
        <div className=" home w-fit border-x-4 border-y-4 ">
            <div className="flex justify-center bg-slate-300 rounded-full h-28 w-28 py-10 items-center
                relative top-20 border mx-auto">
                <h2 className=" font-bold text-2xl">{currentUser?.firstName.charAt(0)}</h2>
            </div>
            <div className=" w-[50%] relative top-28 left-28 border">
                <div className=" m-2">
                    <h2 className=" text-2xl font-light">UserName: {currentUser?.username}</h2>
                </div>
                <div className=" flex justify-evenly">
                    <div className=" mr-2">
                        <h2 className=" text-2xl font-light">First Name: {currentUser?.firstName}</h2>
                    </div>
                    <div>
                        <h2 className=" text-2xl font-light">Last Name: {currentUser?.lastName}</h2>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Email Address: {currentUser?.email}</h2>
                    </div>
                    <div>
                        <h2>Address: {currentUser?.address ? currentUser.address : 'No Address Provided'}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails