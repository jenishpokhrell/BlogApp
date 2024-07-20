import { Routes, Route } from "react-router-dom"
// import Footer from "./pages/public/Footer"
import HomePage from "./pages/public/HomePage"
import { PATH_PUBLIC } from "./routes/path"
import LoginPage from "./pages/public/LoginPage"

const App:React.FC = () => {

  return (
    <>
      {/* <div> */}
        {/* <HomePage/> */}
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path={PATH_PUBLIC.login} element={<LoginPage/>}/>   
        </Routes>
      {/* </div> */}
    </>
  )
}

export default App
