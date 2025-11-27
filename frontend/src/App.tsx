import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Layout from "./components/layouts/Layout"



const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  )
}

export default App  