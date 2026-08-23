import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: '도현이의 첫 번째 생일',
  description: '2026년 9월 5일 토요일 11시 30분 | 아산 가든블룸',
  icons: {
    icon: '/favicon.ico', // 👈 다운로드한 파일명이 favicon.ico면 '/favicon.ico'로 변경
    apple: '/favicon.ico',
  },
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