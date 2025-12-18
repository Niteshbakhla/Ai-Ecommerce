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
import DashboardPage from "./pages/admin-dashboard/pages/Dashboard"
import ProductsPage from "./pages/admin-dashboard/pages/ProductPage"
import OrderPage from "./pages/admin-dashboard/pages/OrderPage"
import CustomerPage from "./pages/admin-dashboard/pages/CustomerPage"
import AnalyticsPage from "./pages/admin-dashboard/pages/AnalyticsPage"
import AdminInventory from "./pages/admin-dashboard/pages/Inventory"




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
                <Route path="inventory" element={<AdminInventory />} />

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