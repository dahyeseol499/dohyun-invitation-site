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
        {/* 네이버 지도 SDK */}
        <Script
          src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=rv9q6yt1sb"
          strategy="afterInteractive"
        />
        {/* 카카오 SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}