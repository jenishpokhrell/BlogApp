import { useEffect, useState } from "react";
import { ILogDto } from "../../types/log.types";
import axiosInstance from "../../utils/axiosInstance";
import { LOGS_URL, MY_LOGS_URL } from "../../utils/globalConfig";
import Navbar from "../../components/Navbar";
import { IoIosNotifications } from "react-icons/io";
import Swal from "sweetalert2";

const Notifications = () => {

    const [logs, setMyLogs] = useState<ILogDto[]>([])
    const [loading, setLoading] = useState(false)

    const fetchLogs = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get<ILogDto[]>(MY_LOGS_URL)
            const { data } = response
            console.log("Fetched data:", data); // Log the fetched data
            const filteredLogs = data.filter(log => 
                log.type === 'blog' || log.type === 'comment'
            )
            console.log("Filtered logs:", filteredLogs);
            setMyLogs(filteredLogs)
            setLoading(false)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Couldn't fetch the data",
            });
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLogs();
    }, [])

    return (
        <div>
            <Navbar />
            <div className=" flex justify-center h-screen">
                <div className=" w-[50%]">
                    <div className=" mt-16 mb-10">
                        <h1 className=" font-semibold text-3xl">Notifications</h1>
                    </div>
                    {logs.map((item, index) => (
                    <div className="h-20 my-5 flex items-center border border-y-2 border-x-2 rounded-2xl">
                        <div className=" mx-7">
                            <IoIosNotifications size={30} />
                        </div>
                        <div key={index} className=" w-full flex items-center justify-between mr-4">
                            <div>
                                <h3 className=" font-semibold text-2xl">
                                    {item.type === 'blog' ? 'New Blog' : 'New Comment' }
                                </h3>
                                <p>{item.userName}</p>
                                <p>{item.description}</p>
                            </div>
                            <div>
                                <p>{item.createdAt}</p>
                            </div>
                        </div>
                    </div>
                        ))}
                </div>

            </div>
        </div>
    )
}

export default Notifications;