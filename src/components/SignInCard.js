'use client';

import { useState, useRef } from 'react';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, User, X,
  LoaderCircle, ShieldCheck, Cpu, CircleCheck, CircleAlert,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import styles from './SignInCard.module.css';

/**
 * Apple-inspired sign-in / sign-up card backed by Supabase Auth.
 * Inspired by 21st.dev "sign-in-card-2" (light beams travelling along the border).
 */
export default function SignInCard({ onSuccess, onClose }) {
  const supabase = createClient();
  const cardRef = useRef(null);

  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'reset'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const isLogin = mode === 'login';
  const isSignup = mode === 'signup';
  const isReset = mode === 'reset';

  const switchMode = (next) => {
    setMode(next);
    setError('');
    setSuccess('');
  };

  // Subtle 3D tilt that follows the pointer
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccess('เข้าสู่ระบบสำเร็จ');
        setTimeout(() => onSuccess?.(data.user), 900);
      } else if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        if (data.session) {
          setSuccess('สร้างบัญชีสำเร็จ');
          setTimeout(() => onSuccess?.(data.user), 900);
        } else {
          setSuccess('สร้างบัญชีแล้ว กรุณายืนยันผ่านอีเมลของคุณ');
          setTimeout(() => switchMode('login'), 3500);
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/login`,
        });
        if (error) throw error;
        setSuccess('ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลแล้ว');
      }
    } catch (err) {
      setError(translateError(err?.message));
    } finally {
      setLoading(false);
    }
  };

  const title = isLogin ? 'ลงชื่อเข้าใช้' : isSignup ? 'สร้างบัญชีของคุณ' : 'รีเซ็ตรหัสผ่าน';
  const subtitle = isLogin
    ? 'ใช้บัญชี find IOT ของคุณเพื่อดำเนินการต่อ'
    : isSignup
      ? 'บัญชีเดียว ใช้ได้กับทุกบริการของ find IOT'
      : 'ใส่อีเมลของคุณ แล้วเราจะส่งลิงก์ให้';
  const cta = isLogin ? 'ลงชื่อเข้าใช้' : isSignup ? 'สร้างบัญชี' : 'ส่งลิงก์รีเซ็ต';

  return (
    <div
      className={styles.stage}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        ref={cardRef}
        className={styles.card}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* Light beams travelling along the border */}
        <span className={`${styles.beam} ${styles.beamTop}`} aria-hidden="true" />
        <span className={`${styles.beam} ${styles.beamRight}`} aria-hidden="true" />
        <span className={`${styles.beam} ${styles.beamBottom}`} aria-hidden="true" />
        <span className={`${styles.beam} ${styles.beamLeft}`} aria-hidden="true" />
        <span className={styles.sheen} aria-hidden="true" />

        {onClose && (
          <button type="button" id="auth-close" className={styles.close} onClick={onClose} aria-label="ปิด">
            <X size={16} strokeWidth={2.4} />
          </button>
        )}

        <div className={styles.inner}>
          <div className={styles.logo} aria-hidden="true">
            <Cpu size={26} strokeWidth={1.8} />
          </div>

          <h1 className={styles.title} key={title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>

          <form onSubmit={handleSubmit} className={styles.form} noValidate={false}>
            <div className={styles.group}>
              {isSignup && (
                <label className={styles.field}>
                  <User className={styles.icon} size={17} />
                  <input
                    id="auth-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=" "
                    autoComplete="name"
                    required
                  />
                  <span className={styles.floatLabel}>ชื่อ-นามสกุล</span>
                </label>
              )}

              <label className={styles.field}>
                <Mail className={styles.icon} size={17} />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  autoComplete="email"
                  required
                />
                <span className={styles.floatLabel}>อีเมล</span>
              </label>

              {!isReset && (
                <label className={styles.field}>
                  <Lock className={styles.icon} size={17} />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                    minLength={6}
                    required
                  />
                  <span className={styles.floatLabel}>รหัสผ่าน</span>
                  <button
                    type="button"
                    id="auth-toggle-password"
                    className={styles.eye}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </label>
              )}
            </div>

            {isSignup && <p className={styles.hint}>รหัสผ่านอย่างน้อย 6 ตัวอักษร</p>}

            {isLogin && (
              <div className={styles.row}>
                <button type="button" id="auth-forgot" className={styles.link} onClick={() => switchMode('reset')}>
                  ลืมรหัสผ่านใช่หรือไม่?
                </button>
              </div>
            )}

            {error && (
              <div className={`${styles.alert} ${styles.alertError}`} role="alert">
                <CircleAlert size={16} /> <span>{error}</span>
              </div>
            )}
            {success && (
              <div className={`${styles.alert} ${styles.alertSuccess}`} role="status">
                <CircleCheck size={16} /> <span>{success}</span>
              </div>
            )}

            <button type="submit" id="auth-submit" className={styles.submit} disabled={loading}>
              {loading ? (
                <LoaderCircle size={18} className={styles.spin} />
              ) : (
                <>
                  <span>{cta}</span>
                  <ArrowRight size={17} className={styles.arrow} />
                </>
              )}
            </button>
          </form>

          <div className={styles.divider}><span>หรือ</span></div>

          <p className={styles.switch}>
            {isLogin && (
              <>ยังไม่มีบัญชี?{' '}
                <button type="button" id="auth-to-signup" className={styles.link} onClick={() => switchMode('signup')}>
                  สร้างบัญชีใหม่
                </button>
              </>
            )}
            {isSignup && (
              <>มีบัญชีอยู่แล้ว?{' '}
                <button type="button" id="auth-to-login" className={styles.link} onClick={() => switchMode('login')}>
                  ลงชื่อเข้าใช้
                </button>
              </>
            )}
            {isReset && (
              <button type="button" id="auth-back-login" className={styles.link} onClick={() => switchMode('login')}>
                กลับไปหน้าลงชื่อเข้าใช้
              </button>
            )}
          </p>

          <p className={styles.privacy}>
            <ShieldCheck size={13} />
            ข้อมูลของคุณถูกเข้ารหัสและจัดเก็บอย่างปลอดภัยด้วย Supabase
          </p>
        </div>
      </div>
    </div>
  );
}

function translateError(msg = '') {
  const m = msg.toLowerCase();
  if (m.includes('invalid login')) return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง';
  if (m.includes('email not confirmed')) return 'กรุณายืนยันอีเมลก่อนลงชื่อเข้าใช้';
  if (m.includes('already registered')) return 'อีเมลนี้มีบัญชีอยู่แล้ว';
  if (m.includes('password should be')) return 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
  if (m.includes('rate limit')) return 'ลองใหม่อีกครั้งในอีกสักครู่';
  return msg || 'เกิดข้อผิดพลาด กรุณาลองใหม่';
}
