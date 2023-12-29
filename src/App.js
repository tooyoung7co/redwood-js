import AOS from 'aos';
import "aos/dist/aos.css";
import React, { createContext, useEffect, useState } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import './index.css';
// All pages
import Books from './pages/Books';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Orders from './pages/Orders';
import AdminBooks from './pages/AdminBooks';
import { useDocTitle } from './components/CustomHook';
import ScrollToTop from './components/ScrollToTop';

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic',
      });
    }

    window.addEventListener('load', () => {
      aos_init();
    });
  }, []);

  useDocTitle("Redwood");

  return (
    <>
      <Router>
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-books" element={<Books />} />
              <Route path="/my-orders" element={<Orders />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/admin-books" element={<AdminBooks />} />
            </Routes>
          </ScrollToTop>
      </Router>
    </>
  );
}


export default App;
