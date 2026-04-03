import React from 'react';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cart, total, addToCart, removeFromCart, deleteFromCart }) {
  const navigate = useNavigate();

  // Redirect to the Payment Terminal
  const handlePurchase = (e) => {
    e.preventDefault();
    // Logic to save order to database would go here
    navigate('/payment');
  };

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
          {/* Left Side: Shipping Form */}
          <div className="checkout-form-section">
            <h2 className="product-title" style={{ fontSize: '2rem' }}>Shipping Identity</h2>
            <form className="neo-form" onSubmit={handlePurchase}>
              <input type="text" placeholder="Full Name" className="neo-input"  />
              <input type="email" placeholder="Email" className="neo-input"  />
              <input type="text" placeholder="Shipping Address" className="neo-input"  />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="City" className="neo-input"  />
                <input type="text" placeholder="Pin Code" className="neo-input"  />
              </div>

              <button 
                type="submit" 
                className="checkout-btn" 
                style={{ marginTop: '20px', width: '100%' }}
              >
                Proceed to Payment
              </button>
            </form>
          </div>

          {/* Right Side: Manifest Summary */}
          <div className="order-summary-card">
            <h3 className="product-title" style={{ marginBottom: '20px' }}>Manifest Summary</h3>
            <div className="summary-list">
              {cart.length === 0 ? (
                <div className="empty-checkout">
                  <p>Your manifest is empty.</p>
                  <button className="support-link" onClick={() => navigate('/')}>Return to Sector</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item._id} className="summary-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#fff' }}>{item.name}</div>
                      <div style={{ color: '#00f2fe', fontWeight: 'bold', marginTop: '4px' }}>
                        ₹{item.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '20px' }}>
                      <button type="button" onClick={() => removeFromCart(item)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                        <Minus size={14} />
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{item.qty}</span>
                      <button type="button" onClick={() => addToCart(item)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      type="button"
                      onClick={() => deleteFromCart(item)} 
                      style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', padding: '5px' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>
            
            <div className="price-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <span style={{ fontSize: '1.1rem', opacity: 0.8 }}>Final Credits</span>
              <span className="price-text" style={{ fontSize: '1.8rem', color: '#00f2fe', textShadow: '0 0 10px rgba(0, 242, 254, 0.3)' }}>
                ₹{total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;