import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Image,
  MessageSquareQuote,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { setAdminAuth } from '../../utils/storage';
import './AdminSidebar.css';

export const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdminAuth(false);
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products Catalog', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Projects Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'Leads & Inquiries', path: '/admin/inquiries', icon: Inbox },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings }
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <ShieldCheck size={24} className="brand-icon" />
        <div>
          <h3 className="brand-title">Atelier CMS</h3>
          <span className="brand-badge">ADMIN PORTAL</span>
        </div>
      </div>

      <nav className="admin-nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <Link to="/" target="_blank" className="btn-view-site">
          <ExternalLink size={15} /> View Public Website
        </Link>
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>
  );
};
