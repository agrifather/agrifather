import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Blogs from "../pages/Blogs";
import BlogSingle from "../pages/BlogSingle";
import Videos from "../pages/Videos";
import Categories from "../pages/Categories";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import News from "../pages/News";

import ProtectedAdmin from "../context/ProtectedAdmin";
import ProtectedRoute from "../context/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import AddBlog from "../pages/AddBlog";
import AddVideo from "../pages/AddVideo";
import ManageBlogs from "../pages/ManageBlogs";
import ManageVideos from "../pages/ManageVideos";

import EditBlog from "../pages/EditBlog";
import EditVideo from "../pages/EditVideo";
import AdminMessages from "../pages/AdminMessages";

import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import CategoryPage from "../pages/CategoryPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      
      <Route path="/category/:type" element={<CategoryPage />} />

      <Route
        path="/news"
        element={
          <ProtectedRoute>
            <News />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blogs/:id"
        element={
          <ProtectedRoute>
            <BlogSingle />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/forgot-password"
        element={
            <ForgotPassword />
        }
      />

      <Route
        path="/reset-password"
        element={
            <ResetPassword />
        }
      />

      <Route
        path="/admin/messages"
        element={
          <ProtectedAdmin>
            <AdminMessages />
          </ProtectedAdmin>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <AdminDashboard />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/add-blog"
        element={
          <ProtectedAdmin>
            <AddBlog />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/add-video"
        element={
          <ProtectedAdmin>
            <AddVideo />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/manage-blogs"
        element={
          <ProtectedAdmin>
            <ManageBlogs />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/manage-videos"
        element={
          <ProtectedAdmin>
            <ManageVideos />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/blogs/edit/:id"
        element={
          <ProtectedAdmin>
            <EditBlog />
          </ProtectedAdmin>
        }
      />

      <Route
        path="/admin/videos/edit/:id"
        element={
          <ProtectedAdmin>
            <EditVideo />
          </ProtectedAdmin>
        }
      />
    </Routes>
  );
}
