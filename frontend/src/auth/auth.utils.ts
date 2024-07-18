import { Roles } from "../types/auth.types";
import axiosInstance from "../utils/axiosInstance";

export const setSession = (accessToken: string | null) => {
    if(accessToken){
        localStorage.setItem('accessToken', accessToken)
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }else{
        localStorage.removeItem('accessToken')
        axiosInstance.defaults.headers.common.Authorization
    }
}

export const getSession = () => {
    return localStorage.getItem('accessToken')
}

export const allAccessRoles = [Roles.ADMIN, Roles.USER]
export const adminAccessRoles = [Roles.ADMIN]

