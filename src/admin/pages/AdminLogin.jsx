import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';
import { setAdminAuth, getSettings } from '../../utils/storage';
import './AdminLogin.css';

export const AdminLogin = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const settings = getSettings();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    // Mock Authentication
    setAdminAuth(true);
    navigate('/admin');
  };

  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-header">
          <ShieldCheck size={36} className="login-brand-icon" />
          <h2 className="login-title">Atelier CMS Admin Portal</h2>
          <p className="login-sub">{settings.businessName || '[CLIENT_BUSINESS_NAME]'} Content Management</p>
        </div>

        {error && <div className="login-error-alert">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Admin Username</label>
            <div className="input-with-icon">
              <User size={16} className="input-icon" />
              <input
                type="text"
                required
                className="form-input login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-with-icon">
              <Lock size={16} className="input-icon" />
              <input
                type="password"
                required
                className="form-input login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full login-btn">
            Sign In to Dashboard <ArrowRight size={16} />
          </button>
        </form>

        <div className="login-footer">
          <Link to="/" className="back-to-site-link">
            ← Return to Public Website
          </Link>
          <span className="demo-credentials">Demo: admin / admin123</span>
        </div>
      </div>
    </div>
  );
};
