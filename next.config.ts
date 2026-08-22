import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://oapi.map.naver.com https://*.naver.com",
              "style-src 'self' 'unsafe-inline' https://oapi.map.naver.com",
              "img-src 'self' data: blob: https://*.naver.com https://*.naver.net https://ssl.pstatic.net https://phinf.pstatic.net",
              "font-src 'self' data:",
              "connect-src 'self' https://oapi.map.naver.com https://*.naver.com https://*.naver.net",
              "frame-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;