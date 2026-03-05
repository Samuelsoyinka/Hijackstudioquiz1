import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Business Growth Diagnostic | Hijack Studio',
  description:
    'A free 3-minute assessment that evaluates your business across lead acquisition, conversion, and retention — and gives you a personalized action plan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#F5F1E8] text-[#1A1A1A] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
