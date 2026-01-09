
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import React, { useEffect, useRef, useMemo } from 'react';
import CreateAd from './Components/CreateAd';
import Ads from './Components/Ads';
import IlanDetay from './Components/IlanDetay';
import Admin from './Components/Admin';
import AdminLogin from './Components/AdminLogin';
import Reklam from './Components/Reklam';

function App() {
  const hasLogged = useRef(false);
  
  // Subdomain kontrolü
  const isAdminSubdomain = useMemo(() => {
    const hostname = window.location.hostname;
    // auth.naxauto.shop kontrolü
    // localhost'ta test için: localhost veya 127.0.0.1 ise pathname'e bak
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return window.location.pathname.startsWith('/auth');
    }
    // Production: auth.naxauto.shop veya auth.* şeklinde subdomain kontrolü
    return hostname.startsWith('auth.') || hostname === 'auth.naxauto.shop';
  }, []);

  useEffect(() => {
    if (!hasLogged.current) {
      console.log("%c𝔽𝕠𝕦𝕟𝕕𝕖𝕣 𝕠𝕗 Krisoft", "font-size: 16px; font-weight: bold; color: #1976d2;");
      console.log("%c👉 https://krisoft.shop", "font-size: 14px; color: #059669; text-decoration: underline;");
      hasLogged.current = true;
    }
  }, []);

  // Admin subdomain ise sadece admin route'larını göster
  if (isAdminSubdomain) {
    return (
      <Router>
        <div className="app-wrapper">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<AdminLogin />} />
              <Route path="/dashboard" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }

  // Normal domain ise sadece kullanıcı route'larını göster
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Ads />} />
            <Route path="/elan-yarat" element={<CreateAd />} />
            <Route path="/ilan/:id" element={<IlanDetay />} />
            <Route path="/reklam" element={<Reklam />} />
            {/* Admin route'larını normal domain'de engelle */}
            <Route path="/admin" element={<Navigate to="/" replace />} />
            <Route path="/admin/login" element={<Navigate to="/" replace />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
