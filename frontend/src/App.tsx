import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/public/HomePage"
import { PATH_MAIN, PATH_PUBLIC } from "./routes/path"
import LoginPage from "./pages/public/LoginPage"
import RegisterPage from "./pages/public/RegisterPage"
import NotFoundPage from "./pages/public/NotFoundPage"
import UnauthorizedPage from "./pages/public/UnauthorizedPage"
import Blogs from "./pages/main/Blogs"
import AuthGuard from "./auth/AuthGuard"
import { allAccessRoles } from "./auth/auth.utils"
import Notifications from "./pages/main/Notifications"
import PostBlog from "./pages/main/PostBlog"

const App:React.FC = () => {

  return (
    <>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path={PATH_PUBLIC.login} element={<LoginPage/>}/>  
            <Route path={PATH_PUBLIC.register} element={<RegisterPage/>}/> 
            <Route path={PATH_PUBLIC.notFound} element = {<NotFoundPage/>}/>
            <Route path={PATH_PUBLIC.unauthorized} element = {<UnauthorizedPage/>}/>
            
            <Route element={<AuthGuard roles={allAccessRoles} />}>
              <Route path={PATH_MAIN.blogs} element = {<Blogs/>}/>
              <Route path={PATH_MAIN.notifications} element={<Notifications/>}/>
              <Route path={PATH_MAIN.postBlog } element={ <PostBlog/> }/>
            </Route>
        </Routes> 
    </>
  )
}

export default App
