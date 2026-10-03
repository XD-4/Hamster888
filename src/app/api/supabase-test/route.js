import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const isConfigured = 
    url.length > 0 && 
    !url.includes('your-project-id') &&
    anonKey.length > 0 && 
    !anonKey.includes('your-supabase-anon-key');

  if (!isConfigured) {
    return NextResponse.json({
      status: 'pending_configuration',
      message: 'กรุณากรอก NEXT_PUBLIC_SUPABASE_URL และ NEXT_PUBLIC_SUPABASE_ANON_KEY ในไฟล์ .env.local',
      configured: false,
      urlPreview: url ? (url.substring(0, 20) + '...') : 'ยังไม่ได้ระบุ',
      hasKey: !!anonKey && !anonKey.includes('your-supabase-anon-key')
    });
  }

  try {
    const supabase = await createClient();
    // Test simple heartbeat / query
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return NextResponse.json({
        status: 'error',
        message: error.message,
        configured: true
      }, { status: 400 });
    }

    return NextResponse.json({
      status: 'success',
      message: 'เชื่อมต่อ Supabase API สำเร็จเรียบร้อย!',
      configured: true,
      url: url
    });
  } catch (err) {
    return NextResponse.json({
      status: 'error',
      message: err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ Supabase',
      configured: true
    }, { status: 500 });
  }
}
