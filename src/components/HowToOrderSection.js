'use client';

import { useState } from 'react';

export default function HowToOrderSection({ onOpenPaymentModal, onGoToShop }) {
  const [activeStep, setActiveStep] = useState(1);
  const [copiedAccount, setCopiedAccount] = useState('');

  const steps = [
    {
      step: 1,
      title: 'เลือกอุปกรณ์ที่ต้องการ',
      subtitle: 'Select Hardware & Components',
      icon: '🛍️',
      desc: 'เลือกชิปเซต, ไมโครคอนโทรลเลอร์ หรือเซนเซอร์ที่คุณต้องการ ตรวจสอบสเปก และคลิกปุ่ม "หยิบลงถุงสินค้า" หรือ "สั่งซื้อทันที"',
      tip: 'สามารถดูสเปกเชิงลึกและ Pinout Diagram ได้ในหน้ารายละเอียดสินค้า',
    },
    {
      step: 2,
      title: 'เช็คสินค้าในตะกร้า & ใบเสนอราคา',
      subtitle: 'Review Bag & Quotation',
      icon: '🧾',
      desc: 'ตรวจสอบจำนวนและรายการสินค้าในตะกร้า ระบบคำนวณราคารวม VAT และสิทธิ์จัดส่งฟรีอัตโนมัติ สำหรับหน่วยงานสามารถดาวน์โหลดใบเสนอราคา (Quotation) ได้ทันที',
      tip: 'ซื้อครบ 1,500 บาท ฟรีค่าจัดส่ง Flash Express / ไปรษณีย์ไทย EMS ทั่วประเทศ',
    },
    {
      step: 3,
      title: 'กรอกที่อยู่ & ข้อมูลใบกำกับภาษี',
      subtitle: 'Shipping & Tax Invoice',
      icon: '📝',
      desc: 'ระบุชื่อ ที่อยู่ เบอร์โทรศัพท์สำหรับการจัดส่ง หากต้องการใบกำกับภาษีเต็มรูปแบบ ให้คลิกเลือก "ต้องการใบกำกับภาษี" และระบุเลขประจำตัวผู้เสียภาษี 13 หลัก',
      tip: 'ราคาสินค้ารวม VAT แล้ว สามารถนำไปเบิกจ่าย มหาวิทยาลัย / โรงเรียน / หน่วยงานราชการ ได้ 100%',
    },
    {
      step: 4,
      title: 'ชำระค่าสินค้าและบริการ',
      subtitle: 'Payment via Banking or PromptPay',
      icon: '💳',
      desc: 'โอนเงินเข้าบัญชีธนาคารของบริษัทฯ (SCB, KBANK) หรือสแกน QR Code PromptPay ตามยอดรวมที่ระบบแจ้งไว้',
      tip: 'โปรดโอนเงินตามยอดที่มีเศษสตางค์ (ถ้ามี) เพื่อให้ระบบตรวจยอดได้รวดเร็วยิ่งขึ้น',
    },
    {
      step: 5,
      title: 'แจ้งชำระเงินผ่านเว็บไซต์',
      subtitle: 'Inform Payment & Slip Upload',
      icon: '📤',
      desc: 'เมื่อโอนเงินเรียบร้อยแล้ว ให้มาที่เมนู "แจ้งชำระเงิน" กรอกเลขคำสั่งซื้อ แนบภาพสลิปหลักฐาน และระบุวันเวลาที่โอนเงิน',
      tip: 'ข้อมูลการแจ้งโอนจะถูกส่งเข้าฐานข้อมูล Cloud แบบเรียลไทม์ เจ้าหน้าที่จะตรวจสอบภายใน 15-30 นาที',
    },
    {
      step: 6,
      title: 'รอรับพัสดุ & หมายเลข Tracking',
      subtitle: 'Express Dispatch & Tracking',
      icon: '🚚',
      desc: 'เมื่อตรวจสอบยอดชำระเงินเรียบร้อย ทางร้านจะแพ็กสินค้าด้วยกล่องกันกระแทกเกรดอุตสาหกรรมและจัดส่งให้คุณทันที พร้อมส่ง SMS/Email แจ้งเลขพัสดุ',
      tip: 'แจ้งโอนก่อน 14:00 น. (จันทร์-ศุกร์) จัดส่งรอบวันเดียวกัน ได้รับสินค้าใน 1-2 วันทำการ',
    },
  ];

  const banks = [
    {
      id: 'scb',
      name: 'ธนาคารไทยพาณิชย์ (SCB)',
      branch: 'สาขาเซ็นทรัลพลาซา',
      accountName: 'บริษัท เอส. สมาร์ทเทค ซิสเต็ม จำกัด',
      accountNumber: '436-098888-8',
      color: '#4e2a84',
      icon: '🟣',
    },
    {
      id: 'kbank',
      name: 'ธนาคารกสิกรไทย (KBANK)',
      branch: 'สาขาเซ็นทรัลพลาซา',
      accountName: 'บริษัท เอส. สมาร์ทเทค ซิสเต็ม จำกัด',
      accountNumber: '049-888888-4',
      color: '#f5f5f7',
      icon: '🟢',
    },
    {
      id: 'promptpay',
      name: 'พร้อมเพย์ (PromptPay QR)',
      branch: 'Corporate Tax ID',
      accountName: 'บริษัท เอส. สมาร์ทเทค ซิสเต็ม จำกัด',
      accountNumber: '0405559008888',
      color: 'var(--text-primary)',
      icon: '🔵',
    },
  ];

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(''), 2000);
  };

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--apple-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
          HOW TO ORDER &bull; GUIDELINE
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '16px' }}>
          วิธีการสั่งซื้อสินค้า 6 ขั้นตอน
        </h2>
        <p style={{ color: 'var(--apple-text-secondary)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto' }}>
          ขั้นตอนการสั่งซื้อที่สะดวก โปร่งใส และรวดเร็วที่สุด ออกแบบมาเพื่อบุคคลทั่วไป นักวิจัย และหน่วยงานองค์กร
        </p>
      </div>

      {/* Interactive Step Stepper Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: '40px',
        overflowX: 'auto',
        padding: '10px 10px 20px'
      }}>
        {/* Background Connecting Line */}
        <div style={{
          position: 'absolute',
          top: '36px',
          left: '5%',
          right: '5%',
          height: '2px',
          background: 'rgba(0,0,0,0.1)',
          zIndex: 0
        }} />

        {steps.map((s) => {
          const isActive = activeStep === s.step;
          const isDone = activeStep > s.step;
          return (
            <div
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`step-node ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}`}
              style={{ cursor: 'pointer', minWidth: '130px' }}
            >
              <div className="step-circle">
                {isDone ? '✓' : s.step}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'var(--apple-text-secondary)', marginBottom: '2px' }}>
                ขั้นตอนที่ {s.step}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--apple-text-tertiary)' }}>
                {s.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Step Feature Card */}
      {(() => {
        const current = steps.find((s) => s.step === activeStep) || steps[0];
        return (
          <div className="apple-glass" style={{ padding: '40px', marginBottom: '60px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
              <div>
                <span className="chip-badge" style={{ marginBottom: '12px' }}>
                  STEP {current.step} OF 6
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '8px', color: 'var(--text-primary)' }}>
                  {current.title}
                </h3>
                <div style={{ fontSize: '0.9rem', color: 'var(--apple-text-tertiary)', marginTop: '2px' }}>
                  {current.subtitle}
                </div>
              </div>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'rgba(0,113,227, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px'
              }}>
                {current.icon}
              </div>
            </div>

            <p style={{ fontSize: '1.1rem', color: 'var(--apple-text-primary)', lineHeight: 1.7, marginBottom: '24px' }}>
              {current.desc}
            </p>

            <div style={{
              background: 'rgba(0,0,0,0.04)',
              borderLeft: '4px solid var(--apple-blue)',
              padding: '16px 20px',
              borderRadius: '0 14px 14px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '28px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <span style={{ fontSize: '0.92rem', color: 'var(--apple-text-secondary)' }}>
                <strong>คำแนะนำระดับโปร:</strong> {current.tip}
              </span>
            </div>

            {/* Stepper Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
              <button
                onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                disabled={activeStep === 1}
                className="btn-apple-secondary"
                style={{ opacity: activeStep === 1 ? 0.3 : 1 }}
              >
                &larr; ขั้นตอนก่อนหน้า
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {activeStep === 1 && (
                  <button onClick={onGoToShop} className="btn-apple-primary">
                    เลือกสินค้าทันที &rarr;
                  </button>
                )}
                {activeStep === 5 && (
                  <button onClick={onOpenPaymentModal} className="btn-apple-primary">
                    เปิดฟอร์มแจ้งชำระเงิน &rarr;
                  </button>
                )}
                {activeStep < 6 ? (
                  <button
                    onClick={() => setActiveStep((prev) => Math.min(6, prev + 1))}
                    className="btn-apple-primary"
                  >
                    ขั้นตอนถัดไป &rarr;
                  </button>
                ) : (
                  <button onClick={onGoToShop} className="btn-apple-primary">
                    พร้อมแล้ว เริ่มช้อปปิ้ง &rarr;
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Section 2: Bank Transfer Details (บัญชีชำระเงิน) */}
      <div id="payment-accounts" style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>
            ช่องทางการชำระเงินอย่างเป็นทางการ
          </h3>
          <p style={{ color: 'var(--apple-text-secondary)', fontSize: '0.95rem' }}>
            บัญชีนิติบุคคล ออกใบเสร็จรับเงิน/ใบกำกับภาษีได้ถูกต้องตามกฎหมาย 100%
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {banks.map((b) => (
            <div key={b.id} className="apple-glass" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{b.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{b.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--apple-text-tertiary)' }}>{b.branch}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--apple-text-secondary)', marginBottom: '8px' }}>
                  ชื่อบัญชี:
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  {b.accountName}
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: '1.15rem', fontWeight: 700, color: '#0066cc', letterSpacing: '0.05em' }}>
                    {b.accountNumber}
                  </span>
                  <button
                    onClick={() => copyToClipboard(b.accountNumber, b.id)}
                    style={{
                      background: 'rgba(0,0,0,0.1)',
                      border: 'none',
                      color: 'var(--text-primary)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedAccount === b.id ? '✓ คัดลอกแล้ว' : 'คัดลอก'}
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--apple-text-tertiary)' }}>
                * เมื่อโอนเงินแล้วกรุณาเก็บหลักฐานสลิปเพื่อนำมาแจ้งในระบบ
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Shipping & Tax Invoice Bento Policy */}
      <div className="bento-grid">
        
        {/* Shipping Schedule */}
        <div className="apple-glass bento-card-6" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.6rem' }}>🕒</span>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>ตารางและรอบการจัดส่งสินค้า</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ color: 'var(--apple-text-secondary)' }}>จันทร์ - ศุกร์ (แจ้งโอนก่อน 14:00 น.)</span>
              <span style={{ fontWeight: 600, color: 'var(--apple-green)' }}>จัดส่งรอบวันเดียวกัน ⚡</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ color: 'var(--apple-text-secondary)' }}>จันทร์ - ศุกร์ (แจ้งโอนหลัง 14:00 น.)</span>
              <span style={{ color: 'var(--apple-text-primary)' }}>จัดส่งรอบวันทำการถัดไป</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <span style={{ color: 'var(--apple-text-secondary)' }}>เสาร์ (แจ้งโอนก่อน 10:00 น.)</span>
              <span style={{ fontWeight: 600, color: 'var(--apple-green)' }}>จัดส่งรอบวันเดียวกัน ⚡</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--apple-text-secondary)' }}>วันอาทิตย์และวันหยุดนักขัตฤกษ์</span>
              <span style={{ color: 'var(--apple-text-primary)' }}>จัดส่งรอบวันจันทร์เช้า</span>
            </div>
          </div>
        </div>

        {/* Tax Invoice Requirements */}
        <div className="apple-glass bento-card-6" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.6rem' }}>🏢</span>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>การขอใบกำกับภาษีสำหรับหน่วยงาน</h4>
          </div>

          <p style={{ color: 'var(--apple-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
            บริษัทสามารถออกใบเสร็จรับเงิน/ใบกำกับภาษีเต็มรูปแบบได้ทุกรายการสินค้า โปรดเตรียมข้อมูลดังนี้ในขั้นตอนชำระเงิน:
          </p>

          <ul style={{ paddingLeft: '20px', color: 'var(--apple-text-primary)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>ชื่อหน่วยงาน / บริษัท / มหาวิทยาลัย ที่ถูกต้องตาม ภ.พ.20</li>
            <li>เลขประจำตัวผู้เสียภาษีอากร 13 หลัก</li>
            <li>สำนักงานใหญ่ หรือ ระบุสาขา (เช่น สาขาที่ 00000)</li>
            <li>ที่อยู่จดทะเบียนสำหรับออกเอกสารภาษี</li>
          </ul>
        </div>

      </div>

    </section>
  );
}
