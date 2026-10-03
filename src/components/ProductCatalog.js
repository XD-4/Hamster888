'use client';

import { useMemo, useState } from 'react';
import {
  BatteryCharging,
  Bot,
  Check,
  Cpu,
  LayoutGrid,
  Search,
  Scan,
  Wifi,
} from 'lucide-react';
import { IOT_CATEGORIES, IOT_PRODUCTS } from '@/data/products';
import { ProductIllustration } from '@/components/ProductIllustrations';

const CAT_ICON = {
  all: LayoutGrid,
  mcu: Cpu,
  sensor: Scan,
  wireless: Wifi,
  power: BatteryCharging,
  robotics: Bot,
};

const CAT_SHORT = {
  all: 'ทั้งหมด',
  mcu: 'MCU',
  sensor: 'เซนเซอร์',
  wireless: 'ไร้สาย',
  power: 'พาวเวอร์',
  robotics: 'โรบอท',
};

const BADGE_LABEL = {
  Flagship: 'ใหม่',
  Bestseller: 'ยอดนิยม',
  New: 'ใหม่',
};

function formatPrice(n) {
  return `฿${n.toLocaleString()}`;
}

export default function ProductCatalog({ onAddToCart, onSelectProduct }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState('');

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return IOT_PRODUCTS.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.chip.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts = { all: IOT_PRODUCTS.length };
    IOT_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(''), 1400);
  };

  const featured = filteredProducts[0];
  const rest = filteredProducts.slice(1);

  return (
    <section id="products-catalog" className="shop-section">
      <header className="shop-hero">
        <h2 className="shop-headline">
          สินค้า.<span> เลือกชิป เซนเซอร์ และบอร์ดที่ใช่สำหรับคุณ</span>
        </h2>
        <p className="shop-subhead">
          วิธีที่ดีที่สุดในการเลือกฮาร์ดแวร์ที่คุณรัก
        </p>
      </header>

      <div className="shop-toolbar">
        <div className="shop-cats" role="tablist" aria-label="หมวดหมู่สินค้า">
          {IOT_CATEGORIES.map((cat) => {
            const Icon = CAT_ICON[cat.id] || LayoutGrid;
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={cat.name}
                className={`shop-cat ${active ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="shop-cat-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <span className="shop-cat-label">{CAT_SHORT[cat.id] || cat.name}</span>
                <span className="shop-cat-count">{categoryCounts[cat.id] || 0}</span>
              </button>
            );
          })}
        </div>

        <label className="shop-search">
          <Search size={16} strokeWidth={2} aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหา ESP32, LiDAR, Raspberry Pi..."
            aria-label="ค้นหาสินค้า"
          />
        </label>
      </div>

      <p className="shop-count">
        {filteredProducts.length} รายการ
        {selectedCategory !== 'all'
          ? ` ใน${IOT_CATEGORIES.find((c) => c.id === selectedCategory)?.name || ''}`
          : ''}
      </p>

      {filteredProducts.length === 0 ? (
        <div className="shop-empty">
          <p className="shop-empty-title">ไม่พบสินค้าที่ตรงกัน</p>
          <p className="shop-empty-copy">ลองคำค้นอื่น หรือดูสินค้าทั้งหมด</p>
          <button
            type="button"
            className="shop-buy"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            ดูสินค้าทั้งหมด
          </button>
        </div>
      ) : (
        <div className="shop-grid">
          {featured && (
            <article
              className="shop-card shop-card--featured"
              onClick={() => onSelectProduct(featured)}
              onKeyDown={(e) => e.key === 'Enter' && onSelectProduct(featured)}
              role="link"
              tabIndex={0}
              aria-label={`ดูรายละเอียด ${featured.name}`}
            >
              <div className="shop-card-copy">
                {BADGE_LABEL[featured.badge] && (
                  <p className="shop-kicker">{BADGE_LABEL[featured.badge]}</p>
                )}
                <h3 className="shop-card-title">{featured.name}</h3>
                <p className="shop-card-desc">{featured.highlight || featured.description}</p>
                <p className="shop-card-price">
                  เริ่มต้นที่ {formatPrice(featured.price)}
                  {featured.originalPrice ? (
                    <span className="shop-card-was">{formatPrice(featured.originalPrice)}</span>
                  ) : null}
                </p>
                <div className="shop-card-actions">
                  <button
                    type="button"
                    className="shop-learn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(featured);
                    }}
                  >
                    ดูเพิ่มเติม
                  </button>
                  <button
                    type="button"
                    className={`shop-buy ${addedId === featured.id ? 'is-added' : ''}`}
                    onClick={(e) => handleAdd(featured, e)}
                  >
                    {addedId === featured.id ? (
                      <>
                        <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                        เพิ่มแล้ว
                      </>
                    ) : (
                      'ซื้อ'
                    )}
                  </button>
                </div>
              </div>
              <div className="shop-card-visual" aria-hidden="true">
                <ProductIllustration productId={featured.id} category={featured.category} size={280} />
              </div>
            </article>
          )}

          {rest.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <article
                key={product.id}
                className="shop-card"
                onClick={() => onSelectProduct(product)}
                onKeyDown={(e) => e.key === 'Enter' && onSelectProduct(product)}
                role="link"
                tabIndex={0}
                aria-label={`ดูรายละเอียด ${product.name}`}
              >
                <div className="shop-card-copy">
                  {BADGE_LABEL[product.badge] && (
                    <p className="shop-kicker">{BADGE_LABEL[product.badge]}</p>
                  )}
                  <h3 className="shop-card-title">{product.name}</h3>
                  <p className="shop-card-price">
                    เริ่มต้นที่ {formatPrice(product.price)}
                    {product.originalPrice ? (
                      <span className="shop-card-was">{formatPrice(product.originalPrice)}</span>
                    ) : null}
                  </p>
                  <div className="shop-card-actions">
                    <button
                      type="button"
                      className="shop-learn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                    >
                      ดูเพิ่มเติม
                    </button>
                    <button
                      type="button"
                      className={`shop-buy ${isAdded ? 'is-added' : ''}`}
                      onClick={(e) => handleAdd(product, e)}
                    >
                      {isAdded ? (
                        <>
                          <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                          เพิ่มแล้ว
                        </>
                      ) : (
                        'ซื้อ'
                      )}
                    </button>
                  </div>
                </div>
                <div className="shop-card-visual" aria-hidden="true">
                  <ProductIllustration productId={product.id} category={product.category} size={176} />
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
