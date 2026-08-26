import {Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage"
import VideoPage from "../pages/VideoPage";
import LoginPage from "../pages/loginPage";
import ProfilePage from "../pages/profilePage";

export default function AppRoutes(){
    return (

        <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/videos/:id" element={<VideoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        
    )
}