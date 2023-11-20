import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login, Home, Register, ResetPassword, Profile } from "./pages";
import { useSelector } from "react-redux";

const Layout = () => {
  const { userInfo } = useSelector((state) => state.user);
  const location = useLocation();
  return userInfo?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div data-theme={theme} className="w-full min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
