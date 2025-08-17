import { Routes, Route } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import OrderSuccess from './pages/OrderSuccess';
import ManageProducts from './pages/admin/ManageProducts';
import ViewOrders from './pages/admin/ViewOrders';
import UserManagement from './pages/admin/UserManagement';
import AddProduct from './pages/admin/AddProduct';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            {/* --- Public Routes --- */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* --- Routes added for Checkout Flow --- */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} /> {/* <-- 2. ADDED THIS ROUTE */}
            
            {/* --- Admin Parent Route --- */}
            <Route 
              path="/admin" 
              element={<AdminRoute><Admin /></AdminRoute>}
            >
              {/* --- Nested Admin Routes --- */}
              <Route index element={<Typography sx={{p:4}}>Welcome, Admin! Select an option to get started.</Typography>} /> 
              <Route path="products" element={<ManageProducts />} />
              <Route path="products/new" element={<AddProduct />} />
              <Route path="orders" element={<ViewOrders />} />
              <Route path="users" element={<UserManagement />} />
            </Route>

            {/* --- Catch-all Not Found Route --- */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;