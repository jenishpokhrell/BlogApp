import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/public/HomePage"
import { PATH_MAIN, PATH_PUBLIC } from "./routes/path"
import LoginPage from "./pages/public/LoginPage"
import RegisterPage from "./pages/public/RegisterPage"
import NotFoundPage from "./pages/public/NotFoundPage"
import UnauthorizedPage from "./pages/public/UnauthorizedPage"
import Blogs from "./pages/main/Blogs"

const App:React.FC = () => {

  return (
    <>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path={PATH_PUBLIC.login} element={<LoginPage/>}/>  
            <Route path={PATH_PUBLIC.register} element={<RegisterPage/>}/> 
            <Route path={PATH_PUBLIC.notFound} element = {<NotFoundPage/>}/>
            <Route path={PATH_PUBLIC.unauthorized} element = {<UnauthorizedPage/>}/>
            <Route path={PATH_MAIN.blogs} element = {<Blogs/>} />
        </Routes> 
    </>
  )
}

export default App
