import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { checkAdminAuth } from '../../utils/storage';
import { AdminSidebar } from './AdminSidebar';
import './AdminLayout.css';

export const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAdminAuth()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="admin-layout-wrapper">
      <AdminSidebar />
      <main className="admin-main-content">
        <div className="admin-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
