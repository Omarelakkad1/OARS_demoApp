import React from "react";
import Signup from "./components/Signup"; 
import Login from "./components/Login"; 
import ForgotPassword from "./components/ForgotPassword"; // Import ForgotPassword
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Membership from "./routes/Membership";
import Events from "./routes/Events";
import FAQ from "./routes/FAQ"; 
import Support from "./routes/Support";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> Forgot Password route
            <Route path="/membership" element={<Membership />} />
            <Route path="/events" element={<Events />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/support" element={<Support />}  />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
