import React, { useState } from 'react';
import { adminLogin } from '../../lib/supabase';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await adminLogin(username.trim(), password);
      if (res && res.success && res.token) {
        localStorage.setItem('homepulse_admin_token', res.token);
        localStorage.setItem('homepulse_admin_user', res.username || username);
        onLoginSuccess(res.token, res.username || username);
      } else {
        setErrorMsg(res?.error || 'Invalid username or password!');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('A connection error occurred while signing in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hp-admin-login-wrapper">
      {/* Decorative Brand Background Pattern */}
      <div className="hp-login-bg-decorations">
        <div className="hp-decor-circle hp-decor-1"></div>
        <div className="hp-decor-circle hp-decor-2"></div>
      </div>

      <div className="hp-admin-login-card">
        {/* Brand Header */}
        <div className="hp-admin-login-header">
          <div className="hp-login-brand-img">
            <img src="/homepulse_brand_horizontal.png" alt="HomePulse Appliance Repair" />
          </div>
          <div className="hp-login-badge-wrapper">
            <span className="hp-login-badge">ADMIN PORTAL</span>
          </div>
          <h2>Management Console</h2>
          <p>Luxury Appliance Service & Operations</p>
        </div>

        {errorMsg && (
          <div className="hp-admin-login-error">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="hp-admin-login-form">
          <div className="hp-form-group">
            <label className="hp-form-label">Username</label>
            <div className="hp-input-with-icon">
              <div className="hp-input-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <input
                type="text"
                required
                autoFocus
                autoComplete="username"
                className="hp-auth-input"
                placeholder="Enter admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="hp-form-group">
            <label className="hp-form-label">Password</label>
            <div className="hp-input-with-icon">
              <div className="hp-input-icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                className="hp-auth-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="hp-toggle-pwd"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? 'Hide' : 'Show'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="hp-admin-submit-btn" disabled={loading}>
            {loading ? (
              <span className="hp-admin-spinner"></span>
            ) : (
              <>
                <span>Sign In</span>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="hp-admin-login-footer">
          <a href="/" className="hp-back-to-site">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
