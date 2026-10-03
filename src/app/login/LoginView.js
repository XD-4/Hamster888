'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import SignInCard from '@/components/SignInCard';
import styles from './login.module.css';

export default function LoginView() {
  const router = useRouter();

  // Apply saved theme (navbar normally does this on the home page)
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', saved === 'dark' || (!saved && prefersDark));
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.orbA} aria-hidden="true" />
      <div className={styles.orbB} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <header className={styles.top}>
        <Link href="/" id="login-back-home" className={styles.back}>
          <ArrowLeft size={16} /> กลับหน้าร้าน
        </Link>
        <span className={styles.brand}>find IOT</span>
      </header>

      <section className={styles.center}>
        <SignInCard onSuccess={() => router.push('/')} />
      </section>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} find IOT · อุปกรณ์ IoT, ESP32 & Arduino
      </footer>
    </main>
  );
}
