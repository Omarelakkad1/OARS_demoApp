import React from "react";
import Signup from "./components/Signup"; 
import Login from "./components/Login"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home"; // Correct path for Home
import About from "./routes/About"; // Correct path for About
import Service from "./routes/Service"; // Correct path for Service
import Contact from "./routes/Contact"; // Correct path for Contact
import Membership from "./routes/Membership";
import Events from "./routes/Events";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar />  */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
         
           <Route path="/login" element={<Login />}  />
           <Route path="/signup" element={<Signup />} /> 
           <Route path="/membership" element={<Membership />} /> 
           <Route path="/events" element={<Events />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
