import { Route, Routes } from "react-router-dom"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
import Authorization from "./components/pages/Authorization"
import Home from "./components/pages/Home"
import PrivateRoutes from "./components/private/PrivateRoutes"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route element={<PrivateRoutes />} >
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
