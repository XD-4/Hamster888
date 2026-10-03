import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "find IOT",
  description: "ร้านค้าจำหน่ายอุปกรณ์ IoT | ติดต่อ methwin185@gmail.com | 0909611617 | IG: soukix_2553",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
