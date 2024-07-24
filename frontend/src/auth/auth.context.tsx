import { useReducer, ReactNode, createContext, useCallback, useEffect, } from "react";
import { IAuthContext, IAuthContextAction, IAuthContextActionTypes, IAuthContextState, ILoginResponseDto } from "../types/auth.types";
import { getSession, setSession } from "./auth.utils";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, ME_URL, PATH_AFTER_LOGIN, PATH_AFTER_LOGOUT, PATH_AFTER_REGISTER, REGISTER_URL } from "../utils/globalConfig";
import Swal from "sweetalert2";

// we need a reducer function for reducer hook
const authReducer = (state: IAuthContextState, action: IAuthContextAction) => {
    if (action.type === IAuthContextActionTypes.LOGIN) {
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: action.payload,
        };
    }
    if (action.type === IAuthContextActionTypes.LOGOUT) {
        return {
            ...state,
            isAuthenticated: false,
            isAuthLoading: false,
            user: undefined
        };
    }
    return state;
};

// We need an initial state object for useReducer Hook
const initialAuthState: IAuthContextState = {
    isAuthenticated: false,
    isAuthLoading: true,
    user: undefined
};

//We create our context here and export it
export const AuthContext = createContext<IAuthContext | null>(null);

// We need an interface for our context props
interface IProps {
    children: ReactNode;
};

// We create a component to manage all auth functionalities, export it and use it
const AuthContextProvider = ({ children }: IProps) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    const redirect = useNavigate();

    // Initialization Method
    const initializeAuthContext = useCallback(async () => {
        try {
            const token = getSession();
            if (token) {
                // validate accessToken by calling backend
                const response = await axiosInstance.post<ILoginResponseDto>(ME_URL, {
                    token,
                })
                // In response, we receive jwt token and user data
                const { newToken, userInfo } = response.data;
                setSession(newToken);
                dispatch({
                    type: IAuthContextActionTypes.LOGIN,
                    payload: userInfo,
                })

            } else {
                setSession(null)
                dispatch({
                    type: IAuthContextActionTypes.LOGOUT
                })
            }
        } catch (error) {
            setSession(null)
            dispatch({
                type: IAuthContextActionTypes.LOGOUT
            })
        }
    }, [])

    // In start of application, we call initializeAuthContext to be sure about autehtication status
    useEffect(() => {
        console.log('AuthContext Initialize Start')
        initializeAuthContext()
            .then(() => console.log('initializeAuthContext was successful'))
            .catch((error) => console.log(error))
    }, [])

    //Register Method
    const register = useCallback(
        async (
            firstName: string, lastName: string, userName: string, email: string, address: string, password: string
        ) => {
            const response = await axiosInstance.post(REGISTER_URL, {
                firstName,
                lastName,
                userName,
                email,
                address,
                password,
            })
            console.log('Register result: ', response)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User Registered Successfully.",
                showConfirmButton: false,
                timer: 1500
            });
            redirect(PATH_AFTER_REGISTER)
        },
        []
    )

    //Login Method
    const login = useCallback(async (userName: string, password: string) => {
        const response = await axiosInstance.post<ILoginResponseDto>(LOGIN_URL, {
            userName,
            password
        });
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Login was successful",
            showConfirmButton: false,
            timer: 1500
        });
        // In response, we receive jwt token and user data
        const { newToken, userInfo } = response.data
        setSession(newToken);
        dispatch({
            type: IAuthContextActionTypes.LOGIN,
            payload: userInfo,
        })
        redirect(PATH_AFTER_LOGIN)
    }, [])

    //Logout method
    const logout = useCallback(() => {
        setSession(null);
        dispatch({
            type: IAuthContextActionTypes.LOGOUT,
        })
        redirect(PATH_AFTER_LOGOUT)
    }, [])

    //We create an object for values of context provider
    //This will keep our code more readable
    const valuesObject = {
        isAuthenticated: state.isAuthenticated,
        isAuthLoading: state.isAuthLoading,
        user: state.user,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;