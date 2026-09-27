import React, { useState, useEffect, useCallback } from 'react';
import {
  adminVerifySession,
  adminLogout,
  adminGetDashboardStats,
  adminGetServiceRequests,
  adminUpdateServiceRequest,
  adminDeleteServiceRequest,
  adminGetInquiries,
  adminUpdateInquiry,
  adminDeleteInquiry,
  adminGetSubscribers,
  adminDeleteSubscriber,
  adminUpdateSettings,
  adminChangePassword,
  getSiteSettings,
} from '../../lib/supabase';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import AdminLogin from './AdminLogin';
import './AdminPanel.css';

export default function AdminPanel() {
  const { refreshSettings: refreshGlobalSettings } = useSiteSettings();

  // Auth State
  const [token, setToken] = useState(() => localStorage.getItem('homepulse_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => localStorage.getItem('homepulse_admin_user') || 'Admin');
  const [authChecking, setAuthChecking] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | services | inquiries | settings | subscribers | security
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // Dashboard Stats State
  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    inProgressRequests: 0,
    completedRequests: 0,
    totalInquiries: 0,
    newInquiries: 0,
    totalSubscribers: 0,
  });

  // Services State
  const [serviceRequests, setServiceRequests] = useState([]);
  const [serviceFilter, setServiceFilter] = useState('all');
  const [serviceSearch, setServiceSearch] = useState('');
  const [servicesLoading, setServicesLoading] = useState(false);
  const [selectedService, setSelectedService] = useState(null); // Modal detail
  const [editNotes, setEditNotes] = useState('');

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquiryFilter, setInquiryFilter] = useState('all');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // Subscribers State
  const [subscribers, setSubscribers] = useState([]);
  const [subscribersLoading, setSubscribersLoading] = useState(false);

  // Contact Info Settings State
  const [settingsForm, setSettingsForm] = useState({
    company_name: '',
    phone: '',
    phone_raw: '',
    emergency_phone: '',
    email: '',
    address: '',
    city_state: '',
    working_hours: '',
    emergency_badge: '',
    announcement: '',
    whatsapp_number: '',
    whatsapp_display: '',
    facebook_url: '',
    instagram_url: '',
    twitter_url: '',
    linkedin_url: '',
  });
  const [settingsSaving, setSettingsSaving] = useState(false);

  // Password Change State
  const [pwdForm, setPwdForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [pwdSaving, setPwdSaving] = useState(false);

  // Verify Auth on Load
  useEffect(() => {
    const verify = async () => {
      const storedToken = localStorage.getItem('homepulse_admin_token');
      if (!storedToken) {
        setToken('');
        setAuthChecking(false);
        return;
      }
      try {
        const res = await adminVerifySession(storedToken);
        if (res && res.valid) {
          setToken(storedToken);
          if (res.username) setAdminUser(res.username);
        } else {
          localStorage.removeItem('homepulse_admin_token');
          localStorage.removeItem('homepulse_admin_user');
          setToken('');
        }
      } catch (err) {
        console.error('Session verify error:', err);
        setToken('');
      } finally {
        setAuthChecking(false);
      }
    };
    verify();
  }, []);

  // Fetch Dashboard Stats
  const fetchStats = useCallback(async () => {
    if (!token) return;
    const res = await adminGetDashboardStats(token);
    if (res && res.success && res.stats) {
      setStats(res.stats);
    }
  }, [token]);

  // Fetch Service Requests
  const fetchServices = useCallback(async () => {
    if (!token) return;
    setServicesLoading(true);
    const res = await adminGetServiceRequests(token, serviceFilter);
    if (res && res.success && res.data) {
      setServiceRequests(res.data);
    }
    setServicesLoading(false);
  }, [token, serviceFilter]);

  // Fetch Inquiries
  const fetchInquiries = useCallback(async () => {
    if (!token) return;
    setInquiriesLoading(true);
    const res = await adminGetInquiries(token, inquiryFilter);
    if (res && res.success && res.data) {
      setInquiries(res.data);
    }
    setInquiriesLoading(false);
  }, [token, inquiryFilter]);

  // Fetch Subscribers
  const fetchSubscribers = useCallback(async () => {
    if (!token) return;
    setSubscribersLoading(true);
    const res = await adminGetSubscribers(token);
    if (res && res.success && res.data) {
      setSubscribers(res.data);
    }
    setSubscribersLoading(false);
  }, [token]);

  // Fetch Settings Form
  const fetchSettings = useCallback(async () => {
    const data = await getSiteSettings();
    if (data) {
      setSettingsForm({
        company_name: data.company_name || '',
        phone: data.phone || '',
        phone_raw: data.phone_raw || '',
        emergency_phone: data.emergency_phone || '',
        email: data.email || '',
        address: data.address || '',
        city_state: data.city_state || '',
        working_hours: data.working_hours || '',
        emergency_badge: data.emergency_badge || '',
        announcement: data.announcement || '',
        whatsapp_number: data.whatsapp_number || '',
        whatsapp_display: data.whatsapp_display || '',
        facebook_url: data.facebook_url || '',
        instagram_url: data.instagram_url || '',
        twitter_url: data.twitter_url || '',
        linkedin_url: data.linkedin_url || '',
      });
    }
  }, []);

  // Trigger Data Loads on tab change
  useEffect(() => {
    if (!token) return;
    fetchStats();
    if (activeTab === 'dashboard') {
      fetchServices();
      fetchInquiries();
    } else if (activeTab === 'services') {
      fetchServices();
    } else if (activeTab === 'inquiries') {
      fetchInquiries();
    } else if (activeTab === 'subscribers') {
      fetchSubscribers();
    } else if (activeTab === 'settings') {
      fetchSettings();
    }
  }, [token, activeTab, fetchStats, fetchServices, fetchInquiries, fetchSubscribers, fetchSettings]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await adminLogout(token);
    } catch (e) {}
    localStorage.removeItem('homepulse_admin_token');
    localStorage.removeItem('homepulse_admin_user');
    setToken('');
    showToast('Logged out successfully.', 'info');
  };

  // Service Request Status Update
  const handleUpdateServiceStatus = async (id, newStatus, notes = null) => {
    const res = await adminUpdateServiceRequest(token, id, newStatus, notes);
    if (res && res.success) {
      setServiceRequests((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus, admin_notes: notes !== null ? notes : item.admin_notes } : item))
      );
      if (selectedService && selectedService.id === id) {
        setSelectedService((prev) => ({ ...prev, status: newStatus, admin_notes: notes !== null ? notes : prev.admin_notes }));
      }
      fetchStats();
      showToast('Service request status updated.');
    } else {
      showToast('Error updating status: ' + (res?.error || ''), 'error');
    }
  };

  // Service Request Delete
  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service request?')) return;
    const res = await adminDeleteServiceRequest(token, id);
    if (res && res.success) {
      setServiceRequests((prev) => prev.filter((item) => item.id !== id));
      if (selectedService && selectedService.id === id) setSelectedService(null);
      fetchStats();
      showToast('Service request deleted.');
    } else {
      showToast('Failed to delete service request.', 'error');
    }
  };

  // Inquiry Status Update
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    const res = await adminUpdateInquiry(token, id, newStatus);
    if (res && res.success) {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );
      fetchStats();
      showToast('Message status updated.');
    } else {
      showToast('Failed to update status.', 'error');
    }
  };

  // Inquiry Delete
  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    const res = await adminDeleteInquiry(token, id);
    if (res && res.success) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      fetchStats();
      showToast('Message deleted.');
    } else {
      showToast('Failed to delete message.', 'error');
    }
  };

  // Subscriber Delete
  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm('Are you sure you want to delete this subscriber?')) return;
    const res = await adminDeleteSubscriber(token, id);
    if (res && res.success) {
      setSubscribers((prev) => prev.filter((item) => item.id !== id));
      fetchStats();
      showToast('Subscriber deleted.');
    } else {
      showToast('Failed to delete subscriber.', 'error');
    }
  };

  // Copy all subscriber emails
  const handleCopySubscriberEmails = () => {
    const emails = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    showToast(`${subscribers.length} email addresses copied to clipboard!`);
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSettingsSaving(true);
    try {
      const cleanPhoneDigits = (settingsForm.phone || '').replace(/[^0-9]/g, '');
      const cleanWhatsappDigits = (settingsForm.whatsapp_number || '').replace(/[^0-9]/g, '');

      const payload = {
        ...settingsForm,
        phone: settingsForm.phone,
        phone_raw: cleanPhoneDigits,
        whatsapp_number: cleanWhatsappDigits,
        whatsapp_display: settingsForm.whatsapp_number || settingsForm.phone,
      };

      const res = await adminUpdateSettings(token, payload);
      if (res && res.success) {
        showToast('Company and contact settings updated successfully!');
        await refreshGlobalSettings();
      } else {
        showToast('Error saving settings: ' + (res?.error || ''), 'error');
      }
    } catch (err) {
      console.error('Settings save error:', err);
      showToast('An unexpected error occurred.', 'error');
    } finally {
      setSettingsSaving(false);
    }
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      showToast('New passwords do not match!', 'error');
      return;
    }
    if (pwdForm.newPassword.length < 6) {
      showToast('New password must be at least 6 characters long!', 'error');
      return;
    }

    setPwdSaving(true);
    try {
      const res = await adminChangePassword(token, pwdForm.oldPassword, pwdForm.newPassword);
      if (res && res.success) {
        showToast('Password updated successfully! Secured with database bcrypt hashing.');
        setPwdForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showToast(res?.error || 'Failed to change password.', 'error');
      }
    } catch (err) {
      console.error('Password change error:', err);
      showToast('An error occurred.', 'error');
    } finally {
      setPwdSaving(false);
    }
  };

  // Helper date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Status Badge Component
  const renderStatusBadge = (status, type = 'service') => {
    const config = {
      pending: { label: 'Pending', class: 'hp-badge-pending' },
      in_progress: { label: 'In Progress', class: 'hp-badge-progress' },
      completed: { label: 'Completed', class: 'hp-badge-completed' },
      cancelled: { label: 'Cancelled', class: 'hp-badge-cancelled' },
      new: { label: 'New', class: 'hp-badge-new' },
      contacted: { label: 'Contacted', class: 'hp-badge-progress' },
      resolved: { label: 'Resolved', class: 'hp-badge-completed' },
    };
    const c = config[status] || { label: status, class: 'hp-badge-default' };
    return <span className={`hp-status-badge ${c.class}`}>{c.label}</span>;
  };

  // Filtered Services
  const filteredServices = serviceRequests.filter((item) => {
    if (!serviceSearch.trim()) return true;
    const q = serviceSearch.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.phone && item.phone.toLowerCase().includes(q)) ||
      (item.brand && item.brand.toLowerCase().includes(q)) ||
      (item.city && item.city.toLowerCase().includes(q)) ||
      (item.service_type && item.service_type.toLowerCase().includes(q))
    );
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter((item) => {
    if (!inquirySearch.trim()) return true;
    const q = inquirySearch.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.phone && item.phone.toLowerCase().includes(q)) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.subject && item.subject.toLowerCase().includes(q)) ||
      (item.message && item.message.toLowerCase().includes(q))
    );
  });

  // If session is checking
  if (authChecking) {
    return (
      <div className="hp-admin-loading-screen">
        <div className="hp-admin-spinner-large"></div>
        <p>Loading Admin Console...</p>
      </div>
    );
  }

  // If not authenticated, show AdminLogin
  if (!token) {
    return (
      <AdminLogin
        onLoginSuccess={(newToken, user) => {
          setToken(newToken);
          setAdminUser(user);
          showToast(`Welcome back, ${user}!`);
        }}
      />
    );
  }

  return (
    <div className="hp-admin-app">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`hp-admin-toast hp-toast-${toast.type}`}>
          <div className="hp-toast-content">
            {toast.type === 'success' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`hp-admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="hp-sidebar-brand">
          <a href="/" target="_blank" rel="noreferrer" className="hp-sidebar-logo-link">
            <img src="/homepulse_brand_horizontal_white.png" alt="HomePulse" className="hp-sidebar-brand-img" />
          </a>
          <span className="hp-sidebar-tag">ADMIN</span>
        </div>

        <nav className="hp-sidebar-nav">
          <button
            className={`hp-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="9" />
              <rect x="14" y="3" width="7" height="5" />
              <rect x="14" y="12" width="7" height="9" />
              <rect x="3" y="16" width="7" height="5" />
            </svg>
            <span>Overview</span>
          </button>

          <button
            className={`hp-nav-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => { setActiveTab('services'); setMobileMenuOpen(false); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <span>Service Requests</span>
            {stats.pendingRequests > 0 && (
              <span className="hp-nav-badge">{stats.pendingRequests}</span>
            )}
          </button>

          <button
            className={`hp-nav-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => { setActiveTab('inquiries'); setMobileMenuOpen(false); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Contact & Inquiries</span>
            {stats.newInquiries > 0 && (
              <span className="hp-nav-badge hp-badge-orange">{stats.newInquiries}</span>
            )}
          </button>

          <button
            className={`hp-nav-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>Contact & Social Links</span>
          </button>

          <button
            className={`hp-nav-btn ${activeTab === 'subscribers' ? 'active' : ''}`}
            onClick={() => { setActiveTab('subscribers'); setMobileMenuOpen(false); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Newsletter Subscribers</span>
            <span className="hp-nav-count">{stats.totalSubscribers}</span>
          </button>

          <button
            className={`hp-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => { setActiveTab('security'); setMobileMenuOpen(false); }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Security & Password</span>
          </button>
        </nav>

        <div className="hp-sidebar-footer">
          <div className="hp-admin-user-info">
            <div className="hp-admin-avatar">
              {adminUser.charAt(0).toUpperCase()}
            </div>
            <div className="hp-admin-user-details">
              <strong>{adminUser}</strong>
              <small>Administrator</small>
            </div>
          </div>
          <button onClick={handleLogout} className="hp-logout-btn" title="Sign Out">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="hp-admin-main">
        {/* Top Navbar */}
        <header className="hp-admin-topbar">
          <div className="hp-topbar-left">
            <button
              className="hp-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="hp-topbar-title">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'services' && 'Service Appointments & Repair Requests'}
              {activeTab === 'inquiries' && 'Contact Inquiries & Customer Questions'}
              {activeTab === 'settings' && 'Contact Numbers, WhatsApp & Social Links'}
              {activeTab === 'subscribers' && 'Newsletter Subscribers'}
              {activeTab === 'security' && 'Admin Security & Password Change'}
            </h1>
          </div>

          <div className="hp-topbar-right">
            <a href="/" target="_blank" rel="noreferrer" className="hp-view-site-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>View Website</span>
            </a>
          </div>
        </header>

        {/* Tab 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="hp-tab-content">
            {/* KPI Cards */}
            <div className="hp-stats-grid">
              <div
                className="hp-stat-card hp-card-clickable"
                onClick={() => { setActiveTab('services'); setServiceFilter('pending'); }}
              >
                <div className="hp-stat-icon hp-icon-pending">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="hp-stat-info">
                  <span className="hp-stat-label">Pending Requests</span>
                  <strong className="hp-stat-value">{stats.pendingRequests}</strong>
                </div>
              </div>

              <div
                className="hp-stat-card hp-card-clickable"
                onClick={() => { setActiveTab('services'); setServiceFilter('all'); }}
              >
                <div className="hp-stat-icon hp-icon-total">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div className="hp-stat-info">
                  <span className="hp-stat-label">Total Requests</span>
                  <strong className="hp-stat-value">{stats.totalRequests}</strong>
                </div>
              </div>

              <div
                className="hp-stat-card hp-card-clickable"
                onClick={() => { setActiveTab('inquiries'); setInquiryFilter('new'); }}
              >
                <div className="hp-stat-icon hp-icon-inquiries">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="hp-stat-info">
                  <span className="hp-stat-label">New Inquiries</span>
                  <strong className="hp-stat-value">{stats.newInquiries}</strong>
                </div>
              </div>

              <div
                className="hp-stat-card hp-card-clickable"
                onClick={() => setActiveTab('subscribers')}
              >
                <div className="hp-stat-icon hp-icon-subscribers">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="hp-stat-info">
                  <span className="hp-stat-label">Newsletter Subscribers</span>
                  <strong className="hp-stat-value">{stats.totalSubscribers}</strong>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Overview */}
            <div className="hp-dashboard-sections">
              <div className="hp-dash-section">
                <div className="hp-section-header">
                  <h3>Recent Service Requests</h3>
                  <button className="hp-link-btn" onClick={() => setActiveTab('services')}>
                    View All ({serviceRequests.length}) →
                  </button>
                </div>

                {serviceRequests.length === 0 ? (
                  <div className="hp-empty-state">
                    <p>No service requests registered yet.</p>
                  </div>
                ) : (
                  <div className="hp-table-responsive">
                    <table className="hp-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Customer</th>
                          <th>Phone</th>
                          <th>Brand / Service</th>
                          <th>City</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {serviceRequests.slice(0, 5).map((req) => (
                          <tr key={req.id}>
                            <td className="hp-td-date">{formatDate(req.created_at)}</td>
                            <td>
                              <div className="hp-customer-cell">
                                <div className="hp-cell-avatar">
                                  {req.name ? req.name.charAt(0).toUpperCase() : 'C'}
                                </div>
                                <div className="hp-cell-info">
                                  <strong>{req.name}</strong>
                                  {req.email && <span className="hp-subtext">{req.email}</span>}
                                </div>
                              </div>
                            </td>
                            <td>
                              <a href={`tel:${req.phone}`} className="hp-phone-pill">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                {req.phone}
                              </a>
                            </td>
                            <td>
                              <span className="hp-brand-pill">{req.brand || 'General'}</span>
                              <div className="hp-subtext">{req.service_type}</div>
                            </td>
                            <td>
                              <span className="hp-city-tag">{req.city || '-'}</span>
                            </td>
                            <td>{renderStatusBadge(req.status)}</td>
                            <td>
                              <button
                                className="hp-action-btn"
                                onClick={() => {
                                  setSelectedService(req);
                                  setEditNotes(req.admin_notes || '');
                                }}
                              >
                                Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Quick Settings Shortcut */}
              <div className="hp-dash-quick-settings">
                <div className="hp-section-header">
                  <h3>Quick Contact Information</h3>
                  <button className="hp-link-btn" onClick={() => setActiveTab('settings')}>
                    Edit ✎
                  </button>
                </div>
                <div className="hp-quick-info-box">
                  <div className="hp-info-row">
                    <span>Phone:</span>
                    <strong>{settingsForm.phone || '(800) 555-0199'}</strong>
                  </div>
                  <div className="hp-info-row">
                    <span>Email:</span>
                    <strong>{settingsForm.email || 'info@homepulse.com'}</strong>
                  </div>
                  <div className="hp-info-row">
                    <span>Address:</span>
                    <strong>{settingsForm.address || '100 State Street, Suite 400'}</strong>
                  </div>
                  <div className="hp-info-row">
                    <span>City / State:</span>
                    <strong>{settingsForm.city_state || 'Boston, MA 02109'}</strong>
                  </div>
                  <div className="hp-info-row">
                    <span>Working Hours:</span>
                    <strong>{settingsForm.working_hours || 'Mon - Sat: 7:00 AM - 9:00 PM'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SERVICES MANAGEMENT */}
        {activeTab === 'services' && (
          <div className="hp-tab-content">
            <div className="hp-content-toolbar">
              <div className="hp-filter-tabs">
                <button
                  className={serviceFilter === 'all' ? 'active' : ''}
                  onClick={() => setServiceFilter('all')}
                >
                  All ({serviceRequests.length})
                </button>
                <button
                  className={serviceFilter === 'pending' ? 'active' : ''}
                  onClick={() => setServiceFilter('pending')}
                >
                  Pending
                </button>
                <button
                  className={serviceFilter === 'in_progress' ? 'active' : ''}
                  onClick={() => setServiceFilter('in_progress')}
                >
                  In Progress
                </button>
                <button
                  className={serviceFilter === 'completed' ? 'active' : ''}
                  onClick={() => setServiceFilter('completed')}
                >
                  Completed
                </button>
                <button
                  className={serviceFilter === 'cancelled' ? 'active' : ''}
                  onClick={() => setServiceFilter('cancelled')}
                >
                  Cancelled
                </button>
              </div>

              <div className="hp-search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, phone, brand, or city..."
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                />
              </div>
            </div>

            {servicesLoading ? (
              <div className="hp-table-loading">Loading requests...</div>
            ) : filteredServices.length === 0 ? (
              <div className="hp-empty-state">
                <p>No matching service requests found.</p>
              </div>
            ) : (
              <div className="hp-table-responsive">
                <table className="hp-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer Name</th>
                      <th>Phone</th>
                      <th>Appliance & Brand</th>
                      <th>City</th>
                      <th>Preferred Time</th>
                      <th>Update Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map((req) => (
                      <tr key={req.id}>
                        <td className="hp-td-date">{formatDate(req.created_at)}</td>
                        <td>
                          <div className="hp-customer-cell">
                            <div className="hp-cell-avatar">
                              {req.name ? req.name.charAt(0).toUpperCase() : 'C'}
                            </div>
                            <div className="hp-cell-info">
                              <strong>{req.name}</strong>
                              {req.email && <span className="hp-subtext">{req.email}</span>}
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href={`tel:${req.phone}`} className="hp-phone-pill">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            {req.phone}
                          </a>
                        </td>
                        <td>
                          <span className="hp-brand-pill">{req.brand || 'Appliance'}</span>
                          <div className="hp-subtext">{req.service_type}</div>
                        </td>
                        <td>
                          <span className="hp-city-tag">{req.city || req.address || '-'}</span>
                        </td>
                        <td>
                          <span className="hp-time-badge">{req.time_preference || 'Anytime'}</span>
                        </td>
                        <td>
                          <select
                            className="hp-status-select"
                            value={req.status}
                            onChange={(e) => handleUpdateServiceStatus(req.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <div className="hp-action-group">
                            <button
                              className="hp-action-btn"
                              title="View Full Details"
                              onClick={() => {
                                setSelectedService(req);
                                setEditNotes(req.admin_notes || '');
                              }}
                            >
                              Details
                            </button>
                            <button
                              className="hp-delete-btn"
                              title="Delete Record"
                              onClick={() => handleDeleteService(req.id)}
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="hp-tab-content">
            <div className="hp-content-toolbar">
              <div className="hp-filter-tabs">
                <button
                  className={inquiryFilter === 'all' ? 'active' : ''}
                  onClick={() => setInquiryFilter('all')}
                >
                  All ({inquiries.length})
                </button>
                <button
                  className={inquiryFilter === 'new' ? 'active' : ''}
                  onClick={() => setInquiryFilter('new')}
                >
                  New
                </button>
                <button
                  className={inquiryFilter === 'contacted' ? 'active' : ''}
                  onClick={() => setInquiryFilter('contacted')}
                >
                  Contacted
                </button>
                <button
                  className={inquiryFilter === 'resolved' ? 'active' : ''}
                  onClick={() => setInquiryFilter('resolved')}
                >
                  Resolved
                </button>
              </div>

              <div className="hp-search-box">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name, message, or subject..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                />
              </div>
            </div>

            {inquiriesLoading ? (
              <div className="hp-table-loading">Loading inquiries...</div>
            ) : filteredInquiries.length === 0 ? (
              <div className="hp-empty-state">
                <p>No messages found.</p>
              </div>
            ) : (
              <div className="hp-inquiries-grid">
                {filteredInquiries.map((inq) => (
                  <div key={inq.id} className={`hp-inquiry-card ${inq.status === 'new' ? 'hp-inq-unread' : ''}`}>
                    <div className="hp-inq-header">
                      <div className="hp-inq-author">
                        <h4>{inq.name || 'Anonymous Sender'}</h4>
                        <span className="hp-inq-date">{formatDate(inq.created_at)}</span>
                      </div>
                      <div className="hp-inq-actions">
                        <select
                          className="hp-status-select hp-status-select-sm"
                          value={inq.status}
                          onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="resolved">Resolved</option>
                        </select>
                        <button
                          className="hp-delete-btn"
                          title="Delete Message"
                          onClick={() => handleDeleteInquiry(inq.id)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="hp-inq-contacts">
                      {inq.phone && (
                        <a href={`tel:${inq.phone}`} className="hp-contact-chip">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                          {inq.phone}
                        </a>
                      )}
                      {inq.email && (
                        <a href={`mailto:${inq.email}`} className="hp-contact-chip">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                          {inq.email}
                        </a>
                      )}
                      {inq.subject && (
                        <span className="hp-contact-chip hp-chip-neutral">
                          📍 {inq.subject}
                        </span>
                      )}
                    </div>

                    <div className="hp-inq-message-box">
                      <p>{inq.message || '(No message content provided)'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: CONTACT & SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="hp-tab-content">
            <div className="hp-settings-wrapper">
              <div className="hp-settings-info-banner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <strong>Live Contact Information Integration</strong>
                  <p>
                    Changes made here to phone numbers, email, address, and operating hours immediately sync across the entire website (Header, Footer, FAQ, and Service pages).
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="hp-settings-form">
                <div className="hp-form-grid">

                  {/* SECTION 1: CALL & WHATSAPP NUMBERS */}
                  <div className="hp-settings-section-divider">
                    <h4>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      İletişim & Yönlendirme Numaraları (Call & WhatsApp)
                    </h4>
                    <span>Arama butonları (tel:) ve WhatsApp (wa.me/) yönlendirmeleri için numaralar</span>
                  </div>

                  <div className="hp-field-group">
                    <label>Arama Numarası (Call Number - Doğrudan Arama Linki)</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      placeholder="(800) 555-0199 veya +1 800 555 0199"
                      required
                    />
                    <small>Sitedeki tüm "Ara" butonları ve başlıklar doğrudan bu numarayı arar (tel: linki otomatik oluşturulur)</small>
                  </div>

                  <div className="hp-field-group">
                    <label>WhatsApp Numarası (WhatsApp Yönlendirecek Numara)</label>
                    <input
                      type="text"
                      value={settingsForm.whatsapp_number}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                      placeholder="15715711664 veya +15715711664"
                      required
                    />
                    <small>Sitedeki tüm WhatsApp butonlarına tıklandığında doğrudan bu numaraya WhatsApp sohbeti açılır (wa.me/)</small>
                  </div>

                  <div className="hp-field-group">
                    <label>Acil Servis / 24-7 Hattı (Emergency Hotline - Opsiyonel)</label>
                    <input
                      type="text"
                      value={settingsForm.emergency_phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, emergency_phone: e.target.value })}
                      placeholder="(800) 555-0199"
                    />
                    <small>Gece veya acil müdahale bildirimlerinde gösterilecek numara (boş ise normal arama numarası kullanılır)</small>
                  </div>

                  {/* SECTION 3: SOCIAL MEDIA ACCOUNTS */}
                  <div className="hp-settings-section-divider">
                    <h4>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                      </svg>
                      Social Media Account Links
                    </h4>
                    <span>Updated across header, mobile menu, and footer social icons</span>
                  </div>

                  <div className="hp-field-group">
                    <label>Instagram Profile URL</label>
                    <input
                      type="url"
                      value={settingsForm.instagram_url}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram_url: e.target.value })}
                      placeholder="https://www.instagram.com/yourprofile"
                    />
                    <small>Full URL to your Instagram profile</small>
                  </div>

                  <div className="hp-field-group">
                    <label>Facebook Page URL</label>
                    <input
                      type="url"
                      value={settingsForm.facebook_url}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebook_url: e.target.value })}
                      placeholder="https://www.facebook.com/yourpage"
                    />
                    <small>Full URL to your Facebook business page</small>
                  </div>

                  <div className="hp-field-group">
                    <label>X / Twitter Profile URL</label>
                    <input
                      type="url"
                      value={settingsForm.twitter_url}
                      onChange={(e) => setSettingsForm({ ...settingsForm, twitter_url: e.target.value })}
                      placeholder="https://twitter.com/yourprofile"
                    />
                    <small>Full URL to your X / Twitter account</small>
                  </div>

                  <div className="hp-field-group">
                    <label>LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={settingsForm.linkedin_url}
                      onChange={(e) => setSettingsForm({ ...settingsForm, linkedin_url: e.target.value })}
                      placeholder="https://www.linkedin.com/company/yourpage"
                    />
                    <small>Full URL to your LinkedIn company or profile page</small>
                  </div>

                  {/* SECTION 4: COMPANY & LOCATION INFO */}
                  <div className="hp-settings-section-divider">
                    <h4>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                      Company & Business Info
                    </h4>
                    <span>Addresses, email, working hours & website banners</span>
                  </div>

                  <div className="hp-field-group">
                    <label>Company / Business Name</label>
                    <input
                      type="text"
                      value={settingsForm.company_name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, company_name: e.target.value })}
                      placeholder="HomePulse Appliance Repair"
                    />
                  </div>

                  <div className="hp-field-group">
                    <label>Official Contact Email Address</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      placeholder="info@homepulse.com"
                      required
                    />
                  </div>

                  <div className="hp-field-group">
                    <label>Office / HQ Street Address</label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      placeholder="100 State Street, Suite 400"
                    />
                  </div>

                  <div className="hp-field-group">
                    <label>City, State & ZIP Code</label>
                    <input
                      type="text"
                      value={settingsForm.city_state}
                      onChange={(e) => setSettingsForm({ ...settingsForm, city_state: e.target.value })}
                      placeholder="Boston, MA 02109"
                    />
                  </div>

                  <div className="hp-field-group">
                    <label>Operating Hours Text</label>
                    <input
                      type="text"
                      value={settingsForm.working_hours}
                      onChange={(e) => setSettingsForm({ ...settingsForm, working_hours: e.target.value })}
                      placeholder="Mon - Sat: 7:00 AM - 9:00 PM | Sun: Emergency Service"
                    />
                  </div>

                  <div className="hp-field-group hp-full-width">
                    <label>Emergency Service Badge Text</label>
                    <input
                      type="text"
                      value={settingsForm.emergency_badge}
                      onChange={(e) => setSettingsForm({ ...settingsForm, emergency_badge: e.target.value })}
                      placeholder="24/7 Rapid Response in Greater Boston"
                    />
                  </div>

                  <div className="hp-field-group hp-full-width">
                    <label>Top Announcement Banner Text</label>
                    <input
                      type="text"
                      value={settingsForm.announcement}
                      onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                      placeholder="Same-day luxury appliance repair dispatch available today"
                    />
                  </div>
                </div>

                <div className="hp-form-actions">
                  <button type="submit" className="hp-primary-save-btn" disabled={settingsSaving}>
                    {settingsSaving ? (
                      <span className="hp-admin-spinner"></span>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                          <polyline points="17 21 17 13 7 13 7 21" />
                          <polyline points="7 3 7 8 15 8" />
                        </svg>
                        <span>Save Changes & Update Live Site</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 5: SUBSCRIBERS */}
        {activeTab === 'subscribers' && (
          <div className="hp-tab-content">
            <div className="hp-content-toolbar">
              <h3>Newsletter Subscribers ({subscribers.length})</h3>
              {subscribers.length > 0 && (
                <button className="hp-action-btn hp-btn-with-icon" onClick={handleCopySubscriberEmails}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy All Emails
                </button>
              )}
            </div>

            {subscribersLoading ? (
              <div className="hp-table-loading">Loading subscribers...</div>
            ) : subscribers.length === 0 ? (
              <div className="hp-empty-state">
                <p>No newsletter subscribers found yet.</p>
              </div>
            ) : (
              <div className="hp-table-responsive">
                <table className="hp-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email Address</th>
                      <th>Subscription Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub, idx) => (
                      <tr key={sub.id}>
                        <td>{idx + 1}</td>
                        <td>
                          <a href={`mailto:${sub.email}`} className="hp-email-link">
                            {sub.email}
                          </a>
                        </td>
                        <td>{formatDate(sub.created_at)}</td>
                        <td>
                          <button
                            className="hp-delete-btn"
                            title="Delete Subscriber"
                            onClick={() => handleDeleteSubscriber(sub.id)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 6: SECURITY & PASSWORD CHANGE */}
        {activeTab === 'security' && (
          <div className="hp-tab-content">
            <div className="hp-security-box">
              <div className="hp-security-badge-card">
                <div className="hp-shield-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h4>Cryptographic Security (Bcrypt)</h4>
                  <p>
                    All administrator passwords are salted and hashed using PostgreSQL's pgcrypto blowfish algorithm with 10 dynamic rounds. Plain-text passwords are never stored and cannot be retrieved even with direct database access.
                  </p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="hp-pwd-form">
                <div className="hp-field-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Your current password"
                    value={pwdForm.oldPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, oldPassword: e.target.value })}
                  />
                </div>

                <div className="hp-field-group">
                  <label>New Password (min. 6 characters)</label>
                  <input
                    type="password"
                    required
                    placeholder="Your new strong password"
                    value={pwdForm.newPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                  />
                </div>

                <div className="hp-field-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Confirm your new password"
                    value={pwdForm.confirmPassword}
                    onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                  />
                </div>

                <button type="submit" className="hp-primary-save-btn" disabled={pwdSaving}>
                  {pwdSaving ? (
                    <span className="hp-admin-spinner"></span>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Hash & Update Password</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* SERVICE REQUEST DETAIL MODAL */}
      {selectedService && (
        <div className="hp-modal-backdrop" onClick={() => setSelectedService(null)}>
          <div className="hp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="hp-modal-header">
              <h3>Service Request Details</h3>
              <button className="hp-modal-close" onClick={() => setSelectedService(null)}>
                ✕
              </button>
            </div>

            <div className="hp-modal-body">
              <div className="hp-detail-grid">
                <div className="hp-detail-item">
                  <label>Customer Name</label>
                  <p>{selectedService.name}</p>
                </div>
                <div className="hp-detail-item">
                  <label>Phone</label>
                  <p>
                    <a href={`tel:${selectedService.phone}`} className="hp-phone-link">
                      {selectedService.phone}
                    </a>
                  </p>
                </div>
                <div className="hp-detail-item">
                  <label>Email</label>
                  <p>{selectedService.email || 'Not specified'}</p>
                </div>
                <div className="hp-detail-item">
                  <label>City / Region</label>
                  <p>{selectedService.city || 'Not specified'}</p>
                </div>
                <div className="hp-detail-item">
                  <label>Street Address</label>
                  <p>{selectedService.address || 'Not specified'}</p>
                </div>
                <div className="hp-detail-item">
                  <label>Appliance / Brand</label>
                  <p>
                    <span className="hp-brand-tag">{selectedService.brand || 'General'}</span>
                  </p>
                </div>
                <div className="hp-detail-item">
                  <label>Service / Issue Type</label>
                  <p>{selectedService.service_type || 'General Repair'}</p>
                </div>
                <div className="hp-detail-item">
                  <label>Preferred Time</label>
                  <p className="hp-time-text">{selectedService.time_preference || 'Flexible / Anytime'}</p>
                </div>
                <div className="hp-detail-item hp-full-width">
                  <label>Request / Problem Description</label>
                  <div className="hp-quote-box">
                    {selectedService.message || 'No description provided by customer.'}
                  </div>
                </div>
                <div className="hp-detail-item hp-full-width">
                  <label>Status</label>
                  <select
                    className="hp-status-select"
                    value={selectedService.status}
                    onChange={(e) => handleUpdateServiceStatus(selectedService.id, e.target.value, editNotes)}
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress (Technician Dispatched)</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="hp-detail-item hp-full-width">
                  <label>Internal Admin / Technician Note</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Technician dispatched, OEM replacement parts ordered..."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                  />
                  <button
                    type="button"
                    className="hp-action-btn hp-mt-2"
                    onClick={() => handleUpdateServiceStatus(selectedService.id, selectedService.status, editNotes)}
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>

            <div className="hp-modal-footer">
              <button
                type="button"
                className="hp-delete-btn hp-btn-with-icon"
                onClick={() => handleDeleteService(selectedService.id)}
              >
                Delete Request
              </button>
              <button
                type="button"
                className="hp-action-btn"
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
