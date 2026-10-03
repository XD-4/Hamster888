'use client';

export default function TaxAndQuotationSection({ onGoToShop }) {
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--apple-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
          TAX INVOICE & QUOTATION &bull; ENTERPRISE READY
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px' }}>
          การขอใบกำกับภาษี & ใบเสนอราคา
        </h2>
        <p style={{ color: 'var(--apple-text-secondary)', fontSize: '1.05rem', maxWidth: '680px', margin: '0 auto' }}>
          รองรับการจัดซื้อจัดจ้างสำหรับหน่วยงานราชการ มหาวิทยาลัย สถาบันวิจัย และบริษัทเอกชน 100%
        </p>
      </div>

      <div className="bento-grid" style={{ marginBottom: '48px' }}>
        
        {/* Card 1: 3 Steps for Tax Invoice */}
        <div className="apple-glass bento-card-8" style={{ padding: '36px' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
            3 ขั้นตอนการขอใบกำกับภาษีเต็มรูปแบบ
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                1
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  เลือกสินค้าและเข้าสู่ขั้นตอนชำระเงิน
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--apple-text-secondary)', lineHeight: 1.6 }}>
                  เพิ่มสินค้าที่ต้องการลงถุงสินค้า จากนั้นคลิกปุ่ม "ดำเนินการสั่งซื้อ"
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                2
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  ติ๊กเลือก "ต้องการใบกำกับภาษีเต็มรูปแบบ"
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--apple-text-secondary)', lineHeight: 1.6 }}>
                  ในหน้ากรอกที่อยู่ ให้เลือกตัวเลือกออกใบกำกับภาษี แล้วระบุ <strong>ชื่อหน่วยงาน/บริษัท, เลขผู้เสียภาษี 13 หลัก และสำนักงานใหญ่/สาขา</strong>
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                3
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  รับเอกสารตัวจริงพร้อมพัสดุ
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--apple-text-secondary)', lineHeight: 1.6 }}>
                  ทางบริษัทจะพิมพ์ใบกำกับภาษี/ใบเสร็จรับเงินตัวจริงแนบใส่ซองเอกสารกันน้ำไปพร้อมกับกล่องสินค้า และส่ง e-Tax Invoice ทางอีเมล
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Contact & Quotation Channel */}
        <div className="apple-glass bento-card-4" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📞</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
              ขอใบเสนอราคา / ติดต่อฝ่ายขาย
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--apple-text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              กรณีสั่งซื้อปริมาณมากสำหรับห้องแล็บ มหาวิทยาลัย หรือโปรเจกต์พิเศษ สามารถขอใบเสนอราคาอย่างเป็นทางการได้ทันที
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>📱</span>
                <span style={{ color: 'var(--text-primary)' }}>โทรศัพท์: <strong>090-961-1617</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>💬</span>
                <span style={{ color: 'var(--text-primary)' }}>LINE ID: <strong>SOUKIX</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>✉️</span>
                <span style={{ color: 'var(--text-primary)' }}>ไลน์สำรอง: <strong>SOUKIX</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={onGoToShop}
            className="btn-apple-primary"
            style={{ width: '100%', marginTop: '24px', padding: '12px' }}
          >
            เลือกสินค้าเพื่อเริ่มคำสั่งซื้อ &rarr;
          </button>
        </div>

      </div>

    </section>
  );
}
