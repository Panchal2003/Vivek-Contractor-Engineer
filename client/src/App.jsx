import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Machinery from "./pages/Machinery";
import Workforce from "./pages/Workforce";
import Tenders from "./pages/Tenders";
import Contact from "./pages/Contact";

import Dashboard from "./admin/Dashboard";
import AdminOverview from "./admin/AdminOverview";
import ManageServices from "./admin/ManageServices";
import ManageProjects from "./admin/ManageProjects";
import ManageMachinery from "./admin/ManageMachinery";
import ManageInquiries from "./admin/ManageInquiries";
import AdminLogin from "./admin/AdminLogin";
import AdminProtectedRoute from "./admin/AdminProtectedRoute";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        {!isAdminRoute ? <Navbar /> : null}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/machinery" element={<Machinery />} />
            <Route path="/workforce" element={<Workforce />} />
            <Route path="/tenders" element={<Tenders />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<Dashboard />}>
                <Route index element={<AdminOverview />} />
                <Route path="services" element={<ManageServices />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="machinery" element={<ManageMachinery />} />
                <Route path="inquiries" element={<ManageInquiries />} />
              </Route>
            </Route>
          </Routes>
        </main>

        {!isAdminRoute ? <Footer /> : null}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
