'use client';

import { useState, useEffect } from 'react';
import AppleNavbar from '@/components/AppleNavbar';
import HeroSection from '@/components/HeroSection';
import HowToOrderSection from '@/components/HowToOrderSection';
import ProductCatalog from '@/components/ProductCatalog';
import ProductDetailModal from '@/components/ProductDetailModal';
import CartDrawer from '@/components/CartDrawer';
import InformPaymentModal from '@/components/InformPaymentModal';
import TaxAndQuotationSection from '@/components/TaxAndQuotationSection';
import WaveBackground from '@/components/WaveBackground';
import CinematicIntro from '@/components/CinematicIntro';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('products');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Inform Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentOrderNum, setPaymentOrderNum] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  // Load cart from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('iot_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {
      console.log('Cart load error', e);
    }
  }, []);

  // Save cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('iot_cart', JSON.stringify(cart));
    } catch (e) {
      console.log('Cart save error', e);
    }
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleOpenPaymentWithOrder = (orderNum, amount) => {
    setPaymentOrderNum(orderNum);
    setPaymentAmount(amount);
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      {showSplash && <CinematicIntro onComplete={() => setShowSplash(false)} />}
      
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        opacity: showSplash ? 0 : 1,
        transition: 'opacity 0.8s ease',
        pointerEvents: showSplash ? 'none' : 'auto'
      }}>
        <WaveBackground />
      {/* Top Navbar */}
      <AppleNavbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPaymentModal={() => {
          setPaymentOrderNum('');
          setPaymentAmount('');
          setIsPaymentModalOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Hero Section */}
        <HeroSection
          onExploreProducts={() => {
            setActiveSection('products');
            const el = document.getElementById('products-catalog');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreHowToOrder={() => {
            setActiveSection('order_payment');
          }}
        />

        {/* Section View Switcher */}
        {activeSection === 'products' && (
          <ProductCatalog
            onAddToCart={handleAddToCart}
            onSelectProduct={(product) => setSelectedProduct(product)}
          />
        )}

        {activeSection === 'order_payment' && (
          <HowToOrderSection
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
            onGoToShop={() => setActiveSection('products')}
          />
        )}

        {activeSection === 'contact_tax' && (
          <TaxAndQuotationSection
            onGoToShop={() => setActiveSection('products')}
          />
        )}
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenPaymentModalWithOrder={handleOpenPaymentWithOrder}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Inform Payment Modal */}
      <InformPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        initialOrderNumber={paymentOrderNum}
        initialAmount={paymentAmount}
      />

      {/* YouTube Audio Player handled in WaveBackground */}

      {/* Apple-grade Minimalist Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-elevated)',
        padding: '50px 24px 30px',
        color: 'var(--text-tertiary)',
        fontSize: '0.82rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '30px',
            marginBottom: '40px',
            color: 'var(--text-secondary)'
          }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '12px' }}>
                find IOT
              </div>
              <p style={{ lineHeight: 1.6, fontSize: '0.82rem' }}>
                ศูนย์จำหน่ายอุปกรณ์ฮาร์ดแวร์ IoT, ชิปประมวลผล AI Edge และเซนเซอร์คุณภาพสูง ราคานักศึกษาและองค์กร
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '12px' }}>
                บริการลูกค้า & การสั่งซื้อ
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                <li><a onClick={() => setActiveSection('order_payment')} style={{ cursor: 'pointer' }}>วิธีการสั่งซื้อ & แจ้งชำระเงิน</a></li>
                <li><a onClick={() => setActiveSection('contact_tax')} style={{ cursor: 'pointer' }}>การขอใบกำกับภาษีเต็มรูปแบบ</a></li>
                <li><a onClick={() => setActiveSection('contact_tax')} style={{ cursor: 'pointer' }}>ขอใบเสนอราคา (Quotation)</a></li>
              </ul>
            </div>

            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '12px' }}>
                การจัดส่ง & การรับประกัน
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', padding: 0 }}>
                <li>จัดส่งด่วน Flash Express & ไปรษณีย์ไทย EMS</li>
                <li>แจ้งชำระเงินก่อน 14:00 น. จัดส่งวันเดียวกัน</li>
                <li>จัดส่งฟรีเมื่อซื้อสินค้าครบ 1,500 บาทขึ้นไป</li>
                <li>สินค้าผ่านการทดสอบ QC 100% ก่อนจัดส่ง</li>
              </ul>
            </div>

            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '12px' }}>
                ช่องทางติดต่ออย่างเป็นทางการ
              </div>
              <p style={{ lineHeight: 1.8 }}>
                โทร: 0909611617<br />
                Email: methwin185@gmail.com<br />
                IG: soukix_2553<br />
              </p>
            </div>
          </div>

          <div style={{
            paddingTop: '20px',
            borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              Copyright &copy; 2026 find IOT. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Privacy Policy</span>
              <span>Terms of Purchase</span>
              <span>Sales Policy</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
    </>
  );
}
