import React, { useState } from 'react';
import { User, Package, LogOut, Mail, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Account({ user, setUser }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // Added loading state
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  // Dynamically choose API URL: Use Vercel Environment Variable or fallback to Localhost
  const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const url = `${API_BASE}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update user state and persist session
        setUser(data.user);
        localStorage.setItem('token', data.token);
        localStorage.setItem('neoUser', JSON.stringify(data.user));
        
        // Success redirect
        navigate('/');
      } else {
        alert(data.msg || "Access Denied.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Terminal Link Failed. The server may be waking up—please try again in 30 seconds.");
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('neoUser');
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="auth-page">
        <nav className="nav-glass">
          <div className="brand" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>NEO.MARKET</div>
        </nav>

        <div className="auth-card">
          <div className="auth-header">
            <h1>{isLogin ? 'Access Terminal' : 'Create Identity'}</h1>
            <p>{isLogin ? 'Enter your credentials to sync.' : 'Initialize your market profile.'}</p>
          </div>

          <form onSubmit={handleAuth} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            )}
            <div className="input-group">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                name="email" 
                placeholder="Neural-Mail" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-group">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                name="password" 
                placeholder="Passcode" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <>Syncing... <Loader2 size={18} className="animate-spin" /></>
              ) : (
                <>{isLogin ? 'Initialize Session' : 'Create Account'} <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <p className="auth-toggle">
            {isLogin ? "New to the Sector?" : "Already identified?"}
            <span onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', email: '', password: '' });
            }}>
              {isLogin ? ' Register here' : ' Login here'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <nav className="nav-glass">
        <div className="brand" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>NEO.MARKET</div>
        <button className="cart-btn" onClick={() => navigate('/')}>Back to Store</button>
      </nav>

      <main className="account-container">
        <div className="account-grid">
          <aside className="account-sidebar">
            <div className="user-profile-brief">
              <div className="avatar-large">{user.name ? user.name[0] : 'U'}</div>
              <h3>{user.name}</h3>
              <span className="user-tier">{user.tier}</span>
            </div>
            <nav className="account-nav-links">
              <button className="acc-nav-item active"><User size={18}/> Profile</button>
              <button className="acc-nav-item"><Package size={18}/> Transmissions</button>
              <button className="acc-nav-item logout" onClick={handleLogout}><LogOut size={18}/> Terminate Session</button>
            </nav>
          </aside>

          <section className="account-content">
            <div className="content-card">
              <h2><ShieldCheck size={20} /> Identity Overview</h2>
              <div className="details-grid">
                <div className="detail-box"><label>Name</label><p>{user.name}</p></div>
                <div className="detail-box"><label>Mail</label><p>{user.email}</p></div>
                <div className="detail-box"><label>Sector</label><p>New Delhi Hub</p></div>
                <div className="detail-box"><label>Joined</label><p>{user.joined || 'March 2026'}</p></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Account;