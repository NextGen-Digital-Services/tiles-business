import React, { useState } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Collections } from './pages/Collections';
import { ProductDetail } from './pages/ProductDetail';
import { Projects } from './pages/Projects';
import { Services } from './pages/Services';
import { Quality } from './pages/Quality';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Admin Components & Pages
import { AdminLayout } from './admin/components/AdminLayout';
import { AdminLogin } from './admin/pages/AdminLogin';
import { AdminDashboard } from './admin/pages/AdminDashboard';
import { ProductsManager } from './admin/pages/ProductsManager';
import { CategoriesManager } from './admin/pages/CategoriesManager';
import { GalleryManager } from './admin/pages/GalleryManager';
import { TestimonialsManager } from './admin/pages/TestimonialsManager';
import { InquiriesManager } from './admin/pages/InquiriesManager';
import { SiteSettings } from './admin/pages/SiteSettings';

// Public Shared Layout Component
const PublicLayout = ({ onOpenQuote }) => {
  return (
    <div className="public-site-layout">
      <Header onOpenQuote={onOpenQuote} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer onOpenQuote={onOpenQuote} />
    </div>
  );
};

export default function App() {
  const [quoteModalState, setQuoteModalState] = useState({ isOpen: false, product: null });

  const handleOpenQuote = (product = null) => {
    setQuoteModalState({ isOpen: true, product });
  };

  const handleCloseQuote = () => {
    setQuoteModalState({ isOpen: false, product: null });
  };

  return (
    <>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout onOpenQuote={handleOpenQuote} />}>
          <Route path="/" element={<Home onOpenQuote={handleOpenQuote} />} />
          <Route path="/about" element={<About onOpenQuote={handleOpenQuote} />} />
          <Route path="/collections" element={<Collections onOpenQuote={handleOpenQuote} />} />
          <Route path="/product/:id" element={<ProductDetail onOpenQuote={handleOpenQuote} />} />
          <Route path="/projects" element={<Projects onOpenQuote={handleOpenQuote} />} />
          <Route path="/services" element={<Services onOpenQuote={handleOpenQuote} />} />
          <Route path="/quality" element={<Quality onOpenQuote={handleOpenQuote} />} />
          <Route path="/testimonials" element={<Testimonials onOpenQuote={handleOpenQuote} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductsManager />} />
          <Route path="categories" element={<CategoriesManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="inquiries" element={<InquiriesManager />} />
          <Route path="settings" element={<SiteSettings />} />
        </Route>
      </Routes>

      {/* Global Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalState.isOpen}
        onClose={handleCloseQuote}
        selectedProduct={quoteModalState.product}
      />
    </>
  );
}
