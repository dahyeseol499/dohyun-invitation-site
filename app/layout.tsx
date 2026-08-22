import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: '도현이의 첫 번째 생일',
  description: '도현이의 첫 번째 생일에 초대합니다.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Script
        src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=rv9q6yt1sb"
        strategy="afterInteractive"
        />
      </body>
    </html>
  );
}