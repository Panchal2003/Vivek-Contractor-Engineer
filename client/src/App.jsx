import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; // 👈 add this

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Machinery from "./pages/Machinery";
import Workforce from "./pages/Workforce";
import Tenders from "./pages/Tenders";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* 👈 add this here */}

      <div className="flex flex-col min-h-screen">
        <Navbar />

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
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;