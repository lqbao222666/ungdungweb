import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import HomeLayout from "./layouts/HomeLayout";
import AdminLogin from "./pages/AdminLogin";
import HomePageAdmin from "./pages/HomePageAdmin";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import UserList from "./pages/UserList";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DetailUser from "./pages/DetailUser";

function App() {
  return (
    <Routes>
      {/* Admin login không dùng layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="home" element={<HomePageAdmin />} />
        <Route path="list-products" element={<ProductList />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
        <Route path="list-users" element={<UserList />} />
      </Route>

      {/* Trang người dùng */}
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="detail-user" element={<DetailUser />} />
        <Route path="/sach/:id" element={<ProductDetail />} />
      </Route>

      {/* Đăng nhập, đăng ký */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
