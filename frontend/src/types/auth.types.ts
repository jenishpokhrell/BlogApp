export interface IRegisterDto {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    address: string;
    password: string;
}
 
export interface ILoginDto {
    userName: string,
    password: string
}

export interface IInfoForUsers {
    username: string,
    email: string,
    address: string,
    roles: string[]
}

export interface IAuthUser {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    address: string,
    createdAt: string,
    roles: string[];
}

export interface ILoginResponseDto {
    newToken: string,
    userInfo: IAuthUser
}

export interface IAuthContextState {
    isAuthenticated: boolean,
    isAuthLoading: boolean,
    user?: IAuthUser
}

export enum IAuthContextActionTypes {
    INITIAL = 'INITIAL',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'
}

export interface IAuthContextAction {
    type: IAuthContextActionTypes;
    payload?: IAuthUser;
}

export interface IAuthContext {
    isAuthenticated: boolean,
    isAuthLoading: boolean,
    user?: IAuthUser
    login: (userName: string, password: string) => Promise<void>
    register: (
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        address: string,
        password: string,
    ) => Promise<void>
    logout: () => void;
}

export enum Roles{
    ADMIN = "ADMIN",
    USER = "USER"
}