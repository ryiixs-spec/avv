import type { Metadata } from 'next';
import { Caveat, Nunito, Playfair_Display } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Thank You ☁️ | Interactive Cloud Letter',
  description: 'Sebuah surat kecil yang ditemukan di atas awan. Terima kasih untuk kata-kata manismu.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#87CEEB',
  openGraph: {
    title: 'Thank You — Interactive Cloud Letter',
    description: 'A personal dreamy letter above the clouds.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${caveat.variable} ${nunito.variable}`}>
      <body className="antialiased selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
