import About from "@/pages/About";
import Dashboard from "@/pages/admin/Dashboard";
import Manage from "@/pages/admin/Manage";
import NotFound from "@/pages/admin/NotFound";
import Home from "@/pages/Home";
import Layout from "@/layouts/Layout";
import LayoutAdmin from "@/layouts/LayoutAdmin";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Camping from "@/pages/admin/Camping";
import Profile from "@/pages/user/Profile";
import ProtectRoute from "./ProtectRoute";
import CampingDetall from "@/pages/user/CampingDetall";
import Checkout from "@/pages/user/Checkout";
import CheckoutComplete from "@/pages/user/CheckoutComplete";
import MyOrders from "@/pages/user/MyOrders";
import MyFavorites from "@/pages/user/MyFavorites";
import MyReservations from "@/pages/user/MyReservations";
import MyCamping from "@/pages/user/MyCamping";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Private User */}
        <Route path="user" element={<Layout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="camping/:id" element={<CampingDetall />} />
          <Route path="checkout/:id" element={<Checkout />} />
          <Route path="complete/:session" element={<CheckoutComplete />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="my-camping" element={<MyCamping />} />
          <Route path="my-favorites" element={<MyFavorites />} />
          <Route path="my-reservations" element={<MyReservations />} />
        </Route>

        {/* Private Admin */}
        <Route path="admin" element={<ProtectRoute el={<LayoutAdmin />} />}>
          <Route index element={<Dashboard />} />
          <Route path="manage" element={<Manage />} />
          <Route path="camping" element={<Camping />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
