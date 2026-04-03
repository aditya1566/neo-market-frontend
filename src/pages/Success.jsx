import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Loader2, ShieldCheck } from 'lucide-react';

function Success({ setCart }) {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // 1. Clear the cart immediately
    if (typeof setCart === 'function') {
      setCart([]);
      localStorage.removeItem('neoCart');
    }

    // 2. 5-second delay before showing the success tick
    const timer = setTimeout(() => {
      setIsConfirmed(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setCart]);

  return (
    <div className="success-page">
      <div className="success-container">
        {!isConfirmed ? (
          /* PHASE 1: LOADING SYMBOL */
          <div className="processing-state animate-fade-in">
            <div className="loading-wrapper">
              <Loader2 size={80} className="neo-loader-spin" />
              <ShieldCheck size={30} className="shield-overlay" />
            </div>
            
            <h2 className="pulse-text">CONFIRMING PURCHASE</h2>
            <p className="terminal-loader">Securing Neural Link // Encrypting Transaction</p>
          </div>
        ) : (
          /* PHASE 2: SUCCESS TICK */
          <div className="confirmed-state animate-pop-in">
            <div className="tick-wrapper">
              <div className="tick-circle"></div>
              <Check size={60} className="draw-tick" />
            </div>
            
            <h1 className="success-title">ORDER CONFIRMED</h1>
            <p className="success-msg">Your artifacts are being prepared for delivery.</p>
            
            <button className="neo-btn-action" onClick={() => navigate('/')} style={{marginTop: '20px'}}>
              Return to Home Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Success;