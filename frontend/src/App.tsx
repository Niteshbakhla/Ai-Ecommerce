import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Layout from "./components/layouts/Layout"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetail"
import CartPage from "./pages/Cart"
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard"



const App = () => {
  return (
    <div>

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

          </Routes>
        </Layout>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  )
}

export default App  