import { PATH_MAIN, PATH_PUBLIC } from "../routes/path";

//URLS 
export const HOST_API_KEY = "https://localhost:7125/api";
export const REGISTER_URL = '/Auth/register-user';
export const LOGIN_URL = '/Auth/Login';
export const ME_URL = '/Auth/Me';
export const USERS_URL = '/Auth/Users';
export const INFO_FOR_USERS_URL = '/Auth/UserInfoForUsers';
export const POST_BLOGS_URL = '/Blogs/Create';
export const BLOGS_URL = '/Blogs';
export const MY_BLOGS_URL = '/Blogs/Mine';
export const EDIT_BLOGS_URL = '/Blogs/{id}';
export const DELETE_BLOGS_URL = '/Blogs/{id}';
export const COMMENT_URL = '/Comment/{blogId}';
export const LOGS_URL = '/Logs/Get All Logs';
export const MY_LOGS_URL = '/Logs/My Logs';

//AUTH ROUTES
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_MAIN.blogs;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.login;