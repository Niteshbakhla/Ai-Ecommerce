import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

import Layout from "./components/layouts/Layout"
import ProtectedRoute from "./protectedRoutes/ProtectedRoutes"
import AdminLayout from "./components/layouts/AdminLayout"

// Public
const Register = lazy(() => import("./pages/Register"))
const Login = lazy(() => import("./pages/Login"))

// User
const Home = lazy(() => import("./pages/Home"))
const ProductDetails = lazy(() => import("./pages/ProductDetail"))
const CartPage = lazy(() => import("./pages/Cart"))
const OrdersPage = lazy(() => import("./pages/Order"))

// Admin
const DashboardPage = lazy(() => import("./pages/admin-dashboard/pages/Dashboard"))
const ProductsPage = lazy(() => import("./pages/admin-dashboard/pages/ProductPage"))
const OrderPage = lazy(() => import("./pages/admin-dashboard/pages/OrderPage"))
const CustomerPage = lazy(() => import("./pages/admin-dashboard/pages/CustomerPage"))
const AnalyticsPage = lazy(() => import("./pages/admin-dashboard/pages/AnalyticsPage"))
const AdminInventory = lazy(() => import("./pages/admin-dashboard/pages/Inventory"))

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            {/* Public */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrdersPage />} />
            </Route>

            {/* Admin */}
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
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
