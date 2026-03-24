import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, X, Trash2, Plus, Minus } from 'lucide-react'; // Added icons
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. PERSISTENCE: Load cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('neoCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 2. PERSISTENCE: Save cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('neoCart', JSON.stringify(cart));
  }, [cart]);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 3. CART LOGIC: Add / Increment
  const addToCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist) {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // 4. CART LOGIC: Remove / Decrement
  const removeFromCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x._id !== product._id));
    } else {
      setCart(
        cart.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  // TOTAL CALCULATION
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="app">
      <nav className="nav-glass">
        <div className="brand">NEO.MARKET</div>
        <div className="nav-links">
          <span>Collection</span>
          <span>Studio</span>
        </div>
        
        <div className="cart-trigger-container">
          <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
            <ShoppingBag size={18} />
            <span>{cart.reduce((a, c) => a + c.qty, 0)}</span>
          </button>

          {showCart && (
            <div className="cart-dropdown">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h4 style={{ margin: 0, fontFamily: 'Space Grotesk' }}>Storage Unit</h4>
                <X size={18} onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }} />
              </div>

              <div className="cart-items-scroll">
                {cart.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '13px' }}>Your bag is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="mini-item">
                      <img src={item.imageUrl} alt={item.name} className="cart-img-tiny" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{item.qty} x ${item.price}</div>
                      </div>
                      <div className="qty-controls">
                        <button onClick={() => removeFromCart(item)}><Minus size={12}/></button>
                        <button onClick={() => addToCart(item)}><Plus size={12}/></button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="total-row">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <button className="checkout-btn">Initialize Checkout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <p className="hero-subtext">NEXT-GEN MARKET</p>
          <h1>Curated for <br /> the Future.</h1>
        </section>

        {loading ? (
          <div className="loader">Syncing Data...</div>
        ) : (
          <div className="bento-grid">
            {products.map((product) => (
              <div key={product._id} className="premium-card">
                <div className="img-container">
                  <img src={product.imageUrl} alt={product.name} className="product-img" />
                  <span className="category-tag">{product.category}</span>
                </div>
                <h3 className="product-title">{product.name}</h3>
                <div className="price-row">
                  <span className="price-text">${product.price}</span>
                  <button className="btn-buy" onClick={() => addToCart(product)}>
                    Collect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;