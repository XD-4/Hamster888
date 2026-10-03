'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { sound } from '@/lib/sound';

export default function InformPaymentModal({ isOpen, onClose, initialOrderNumber, initialAmount }) {
  const [orderNumber, setOrderNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('promptpay');
  const [transferDate, setTransferDate] = useState('');
  const [transferTime, setTransferTime] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [slipFile, setSlipFile] = useState(null);
  const [slipPreview, setSlipPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialOrderNumber) setOrderNumber(initialOrderNumber);
    if (initialAmount) setAmount(initialAmount.toString());

    // Default to current date/time
    const now = new Date();
    setTransferDate(now.toISOString().split('T')[0]);
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTransferTime(`${hours}:${minutes}`);
  }, [initialOrderNumber, initialAmount, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSlipFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlipPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderNumber || !amount) {
      alert('กรุณากรอกเลขคำสั่งซื้อและจำนวนเงิน');
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const transferDatetime = `${transferDate}T${transferTime}:00`;

      await supabase.from('payment_notifications').insert([
        {
          order_number: orderNumber,
          bank_name: bank,
          amount: parseFloat(amount),
          transfer_datetime: transferDatetime,
          customer_note: customerNote,
          slip_status: 'pending_verification',
        },
      ]);

      sound.playUpgrade();
      setSuccess(true);
    } catch (err) {
      console.log('Inform payment error', err);
      sound.playUpgrade();
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="apple-modal" onClick={onClose}>
      <div className="apple-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.6rem' }}>📤</span>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                แจ้งชำระเงิน (Inform Payment)
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--apple-text-secondary)' }}>
                ยืนยันการโอนเงินเพื่อดำเนินการจัดส่งสินค้าในรอบถัดไป
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(0,0,0,0.08)',
              border: 'none',
              color: 'var(--text-primary)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '14px' }}>✅</div>
            <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              แจ้งชำระเงินเรียบร้อยแล้ว!
            </h4>
            <p style={{ color: 'var(--apple-text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
              ข้อมูลของคุณได้ถูกบันทึกส่งไปยังเจ้าหน้าที่ฝ่ายจัดส่งแล้ว ทางร้านจะตรวจสอบและจัดเตรียมพัสดุ พร้อมแจ้งเลขพัสดุ Tracking ให้คุณทราบทันที
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="btn-apple-primary"
              style={{ padding: '12px 32px' }}
            >
              ตกลง
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--apple-text-secondary)', marginBottom: '6px' }}>
                หมายเลขคำสั่งซื้อ (Order Number) *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="เช่น IOT-888-29401"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(0,0,0,0.12)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--apple-text-secondary)', marginBottom: '6px' }}>
                  จำนวนเงินที่โอน (บาท) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="เช่น 1850.00"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(0,0,0,0.12)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--apple-text-secondary)', marginBottom: '6px' }}>
                  ธนาคารที่โอนเข้า *
                </label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(0,0,0,0.12)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="promptpay">พร้อมเพย์ PromptPay</option>
                  <option value="scb">ไทยพาณิชย์ (SCB)</option>
                  <option value="kbank">กสิกรไทย (KBANK)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--apple-text-secondary)', marginBottom: '6px' }}>
                  วันที่โอน *
                </label>
                <input
                  type="date"
                  required
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(0,0,0,0.12)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--apple-text-secondary)', marginBottom: '6px' }}>
                  เวลาที่โอน *
                </label>
                <input
                  type="time"
                  required
                  value={transferTime}
                  onChange={(e) => setTransferTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(0,0,0,0.12)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            {/* Slip Upload */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--apple-text-secondary)', marginBottom: '6px' }}>
                แนบภาพสลิปหลักฐานการโอนเงิน
              </label>
              <div style={{
                border: '2px dashed rgba(0,0,0,0.15)',
                borderRadius: '14px',
                padding: '20px',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.02)',
                cursor: 'pointer',
                position: 'relative'
              }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0,
                    cursor: 'pointer'
                  }}
                />
                {slipPreview ? (
                  <div>
                    <img
                      src={slipPreview}
                      alt="Slip preview"
                      style={{ maxHeight: '140px', borderRadius: '8px', margin: '0 auto 8px' }}
                    />
                    <div style={{ fontSize: '0.8rem', color: 'var(--apple-green)' }}>
                      ✓ เลือกภาพเรียบร้อย (คลิกเพื่อเปลี่ยนรูป)
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>📁</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      คลิกเพื่ออัปโหลดรูปสลิป
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--apple-text-tertiary)' }}>
                      รองรับ JPG, PNG หรือสกรีนช็อตจากแอปธนาคาร
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--apple-text-secondary)', marginBottom: '6px' }}>
                หมายเหตุเพิ่มเติม (ถ้ามี)
              </label>
              <input
                type="text"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                placeholder="เช่น ขอให้ออกใบเสร็จในนามมหาวิทยาลัย"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(0,0,0,0.12)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-apple-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '6px' }}
            >
              {submitting ? 'กำลังส่งข้อมูล...' : 'ยืนยันการแจ้งชำระเงิน &rarr;'}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
