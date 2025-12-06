import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Layout from "./components/layouts/Layout"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetail"
import CartPage from "./pages/Cart"
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard"
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes"
import { useSelector } from "react-redux"
import type { RootState } from "./store/store"




const App = () => {



  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>

            {/* Pubic */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
            </Route>

            {/* Admin Only */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>

          </Routes>
        </Layout>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  )
}

export default App  