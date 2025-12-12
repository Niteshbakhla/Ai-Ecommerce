import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Layout from "./components/layouts/Layout"
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetail"
import CartPage from "./pages/Cart"
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes"
import OrdersPage from "./pages/Order"
import AdminLayout from "./components/layouts/AdminLayout"
import DashboardPage from "./components/admin-components/Dashboard"
import ProductsPage from "./components/admin-components/ProductPage"
import OrderPage from "./components/admin-components/OrderPage"
import CustomerPage from "./components/admin-components/CustomerPage"
import AnalyticsPage from "./components/admin-components/AnalyticsPage"




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
              <Route path="/orders" element={<OrdersPage />} />
            </Route>

            {/* Admin Only */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminLayout />}>

                <Route index element={<DashboardPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="customers" element={<CustomerPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />

              </Route>
            </Route>

          </Routes>
        </Layout>
      </BrowserRouter>
      {/* <Login /> */}
    </div>
  )
}

export default App  