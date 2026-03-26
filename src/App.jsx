import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, X, Plus, Minus, Filter, Search, User, LifeBuoy, Mail, MessageSquare } from 'lucide-react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Checkout from './pages/Checkout';
import Account from './pages/Account'; 
import ProtectedRoute from './components/ProtectedRoute';

// --- ADDED THIS LINE ---
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProductCard = ({ product, addToCart }) => (
  <div className="premium-card">
    <div className="img-container">
      <img src={product.imageUrl} alt={product.name} className="product-img" />
      <span className="category-tag">{product.category}</span>
    </div>
    <h3 className="product-title">{product.name}</h3>
    <div className="price-row">
      <span className="price-text">₹{product.price}</span>
      <button className="btn-buy" onClick={() => addToCart(product)}>Collect</button>
    </div>
  </div>
);

function Market({ products, cart, addToCart, removeFromCart, totalPrice, showCart, setShowCart, loading, user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [priceRange, setPriceRange] = useState(5000);

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => (category === 'All' || p.category === category))
    .filter(p => p.price <= priceRange)
    .sort((a, b) => {
      if (sortOrder === 'low-high') return a.price - b.price;
      if (sortOrder === 'high-low') return b.price - a.price;
      return 0;
    });

  return (
    <div className="app">
      <nav className="nav-glass">
        <div className="brand" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>NEO.MARKET</div>
        
        <div className="search-container">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search artifacts..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="nav-actions">
          <button className="nav-icon-btn" onClick={() => navigate('/account')}>
            <User size={20} color={user ? '#6366f1' : 'white'} />
          </button>
          
          <div className="cart-trigger-container">
            <button className="cart-btn" onClick={() => setShowCart(!showCart)}>
              <ShoppingBag size={18} />
              <span className="cart-count">{cart.reduce((a, c) => a + c.qty, 0)}</span>
            </button>

            {showCart && (
              <div className="cart-dropdown">
                <div className="cart-header">
                  <h4 style={{ margin: 0 }}>Storage Unit</h4>
                  <X size={18} onClick={() => setShowCart(false)} style={{ cursor: 'pointer' }} />
                </div>
                <div className="cart-items-scroll">
                  {cart.length === 0 ? <p className="empty-msg">Empty</p> : cart.map(item => (
                    <div key={item._id} className="mini-item">
                      <img src={item.imageUrl} className="cart-img-tiny" alt="" />
                      <div style={{ flex: 1 }}>
                        <div className="item-name-mini">{item.name}</div>
                        <div className="item-price-mini">₹{item.price}</div>
                      </div>
                      <div className="qty-controls">
                        <button onClick={() => removeFromCart(item)}><Minus size={12}/></button>
                        <button onClick={() => addToCart(item)}><Plus size={12}/></button>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div className="cart-footer">
                    <div className="total-row"><span>Total</span><span>₹{totalPrice}</span></div>
                    <button onClick={() => { setShowCart(false); navigate('/checkout'); }} className="checkout-btn">Checkout</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section className="hero">
          <p className="hero-subtext">NEXT-GEN MARKET</p>
          <h1>Curated for <br /> the Future.</h1>
        </section>

        <div className="market-layout">
          <aside className="filter-sidebar">
            <h3 className="filter-title"><Filter size={16} /> Filters</h3>
            <div className="filter-group">
              <label>Category</label>
              <select onChange={(e) => setCategory(e.target.value)} className="neo-select">
                <option value="All">All Sectors</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Apparel</option>
                <option value="Cybernetics">Cybernetics</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Max Price: ₹{priceRange}</label>
              <input type="range" min="0" max="5000" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="neo-range" />
            </div>
            <div className="filter-group">
              <label>Sort</label>
              <button className={`sort-btn ${sortOrder === 'low-high' ? 'active' : ''}`} onClick={() => setSortOrder('low-high')}>Low to High</button>
              <button className={`sort-btn ${sortOrder === 'high-low' ? 'active' : ''}`} onClick={() => setSortOrder('high-low')}>High to Low</button>
            </div>
          </aside>

          <section className="product-results">
            {loading ? <div className="loader">Syncing...</div> : (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="no-results">No artifacts found for "{searchTerm}"</div>
                ) : (
                  <div className="bento-grid">
                    {filteredProducts.map(product => (
                      <ProductCard key={product._id} product={product} addToCart={addToCart} />
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        <section className="support-section">
          <div className="support-card">
            <LifeBuoy size={32} className="support-icon" />
            <h3>Help Center</h3>
            <p>Issues with your neural-link? Check our guides.</p>
            <button className="support-link">Browse Docs</button>
          </div>
          <div className="support-card">
            <MessageSquare size={32} className="support-icon" />
            <h3>Live Transmission</h3>
            <p>Chat with our support agents 24/7.</p>
            <button className="support-link">Start Chat</button>
          </div>
          <div className="support-card">
            <Mail size={32} className="support-icon" />
            <h3>Hyper-Mail</h3>
            <p>Send an encrypted message to our team.</p>
            <button className="support-link">Send Email</button>
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('neoCart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedUser = localStorage.getItem('neoUser');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('neoCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // --- UPDATED THIS LINE TO USE API_BASE ---
        const { data } = await axios.get(`${API_BASE}/api/products`);
        setProducts(data);
        setLoading(false);
      } catch (e) { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist) {
      setCart(cart.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x._id !== product._id));
    } else {
      setCart(cart.map((x) => x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x));
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Market 
            products={products} 
            cart={cart} 
            addToCart={addToCart} 
            removeFromCart={removeFromCart} 
            totalPrice={totalPrice} 
            showCart={showCart} 
            setShowCart={setShowCart} 
            loading={loading}
            user={user}
          />
        } />
        <Route path="/checkout" element={<Checkout cart={cart} total={totalPrice} />} />
        <Route path="/account" element={<Account user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;