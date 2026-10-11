import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from '../chatbot/Chatbot';

const Layout = () => {
  return (
    <div className="App">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Layout;
