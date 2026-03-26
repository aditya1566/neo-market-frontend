import React from 'react';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, total }) {
  const navigate = useNavigate();

  return (
    <div className="checkout-page">
      <nav className="nav-glass">
        <button className="cart-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Back to Market
        </button>
        <div className="brand">SECURE.CHECKOUT</div>
      </nav>

      <main className="main-content checkout-container">
        <div className="checkout-grid">
          {/* Left Side: Form */}
          <div className="checkout-form-section">
            <h2 className="product-title" style={{fontSize: '2rem'}}>Shipping Identity</h2>
            <form className="neo-form">
              <input type="text" placeholder="Full Name" className="neo-input" />
              <input type="email" placeholder="Neural-Mail / Email" className="neo-input" />
              <input type="text" placeholder="Sector / Shipping Address" className="neo-input" />
              

              <button type="button" className="checkout-btn" style={{marginTop: '20px'}}>
                Complete Purchase
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="order-summary-card">
            <h3 className="product-title">Manifest Summary</h3>
            <div className="summary-list">
              {cart.map(item => (
                <div key={item._id} className="summary-item">
                  <span>{item.name} (x{item.qty})</span>
                  <span>${(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="total-divider"></div>
            <div className="price-row">
              <span>Final Credits</span>
              <span className="price-text">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;