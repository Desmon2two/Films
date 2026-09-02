import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import VideoPage from "../pages/VideoPage";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import GuestOnlyRoute from "./GuestOnlyRoute";
import SearchPage from "../pages/SearchPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage />}
      />
      <Route
        path="/videos/:id"
        element={<VideoPage />}
      />
      <Route
        path="/search"
        element={<SearchPage />}
      />
      <Route element={<GuestOnlyRoute />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
      </Route>
    </Routes>
  );
}
