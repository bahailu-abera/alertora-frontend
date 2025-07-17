import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Architecture from './components/Architecture';
import ApiDocs from './components/ApiDocs';
import ApiTesting from './components/ApiTesting';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import UserPreferences from './components/UserPreferences';

const HomePage = () => (
  <>
    <Header />
      <Hero />
      <Features />
      <Architecture />
      <ApiDocs />
      <ApiTesting />
      <SignUp />
      <Footer />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/preferences" element={<UserPreferences />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
