import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, ArrowLeft, Smartphone, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Payment({ total }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  // FIX: Combined into one clean function
  const handleFinalize = () => {
    setProcessing(true);
    // Move to the 5-7 second processing/success page
    navigate('/success');
  };

  return (
    <div className="payment-page">
      <nav className="nav-glass">
        <button className="cart-btn" onClick={() => navigate('/checkout')}>
          <ArrowLeft size={18} /> Cancel Payment
        </button>
        <div className="brand">SECURE.PAYMENT</div>
      </nav>

      <main className="payment-container">
        <div className="payment-card">
          <div className="payment-header">
            <ShieldCheck size={32} color="#00f2fe" />
            <h2>Select Gateway</h2>
          </div>

          <div className="amount-display">
            <label>Credits Due</label>
            <h1>₹{total.toLocaleString()}</h1>
          </div>

          <div className="method-grid">
            <div 
              className={`method-box ${method === 'card' ? 'active' : ''}`} 
              onClick={() => setMethod('card')}
            >
              <CreditCard size={20} />
              <span>Card</span>
            </div>
            <div 
              className={`method-box ${method === 'upi' ? 'active' : ''}`} 
              onClick={() => setMethod('upi')}
            >
              <Smartphone size={20} />
              <span>UPI</span>
            </div>
            <div 
              className={`method-box ${method === 'cod' ? 'active' : ''}`} 
              onClick={() => setMethod('cod')}
            >
              <Truck size={20} />
              <span>COD</span>
            </div>
          </div>

          <div className="payment-form-area">
            {method === 'card' && (
              <div className="neo-form">
                <input type="text" placeholder="Card Number" className="neo-input" />
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <input type="text" placeholder="MM/YY" className="neo-input" />
                  <input type="text" placeholder="CVV" className="neo-input" />
                </div>
              </div>
            )}

            {method === 'upi' && (
              <div className="neo-form">
                <input type="text" placeholder="neural-id@upi" className="neo-input" />
                <p className="helper-text">Enter your VPA for remote authorization.</p>
              </div>
            )}

            {method === 'cod' && (
              <div className="cod-info">
                <CheckCircle size={24} color="#00f2fe" />
                <p>Pay upon artifact delivery to your sector.</p>
              </div>
            )}

            <button 
              className="auth-submit-btn" 
              onClick={handleFinalize}
              disabled={processing}
            >
              {processing ? "Syncing..." : `Confirm ${method.toUpperCase()}`}
            </button>
          </div>

          <div className="security-footer">
            <Lock size={14} /> End-to-End Encrypted Terminal
          </div>
        </div>
      </main>
    </div>
  );
}

export default Payment;