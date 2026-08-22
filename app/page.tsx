'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    naver: any;
  }
}

// 갤러리 이미지 목록 (public/gallery/ 폴더 안의 이미지 경로)
const galleryImages = [
  '/gallery/Dohyun-1.jpeg',
  '/gallery/Dohyun-2.jpeg',
  '/gallery/Dohyun-3.jpeg',
  '/gallery/Dohyun-4.jpeg',
  '/gallery/Dohyun-5.jpeg',
  '/gallery/Dohyun-6.jpeg',
  '/gallery/Dohyun-7.jpeg',
  '/gallery/Dohyun-8.jpeg',
  '/gallery/Dohyun-9.jpeg',
];

export default function Home() {
  const mapElement = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const checkNaverMap = setInterval(() => {
      if (window.naver && window.naver.maps) {
        setMapLoaded(true);
        clearInterval(checkNaverMap);
      }
    }, 100);

    return () => clearInterval(checkNaverMap);
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapElement.current) return;

    const location = new window.naver.maps.LatLng(36.9158102, 127.0285499);

    const mapOptions = {
      center: location,
      zoom: 16,
      zoomControl: false,
      scaleControl: false,
      mapDataControl: false,
    };

    const map = new window.naver.maps.Map(mapElement.current, mapOptions);

    const marker = new window.naver.maps.Marker({
      position: location,
      map: map,
      title: '가든블룸',
    });

    const openNaverMap = () => {
      window.open('https://map.naver.com/p/search/아산%20가든블룸', '_blank');
    };

    window.naver.maps.Event.addListener(marker, 'click', openNaverMap);
    window.naver.maps.Event.addListener(map, 'click', openNaverMap);
  }, [mapLoaded]);

  // 갤러리 모달 제어 함수
  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : (prev as number) - 1));
    }
  };
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  return (
    <main className="page-shell">
      <article className="invitation">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title" className="script-title">
            <span>Happy</span>
            <span>First</span>
            <span>Birthday</span>
          </h1>
          <div className="portrait-wrap">
            <Image className="portrait" src="/dohyun-portrait.png" alt="한복을 입은 도현이" width={480} height={480} priority unoptimized />
          </div>
          <p className="script-name">Dohyun</p>
          <span className="short-rule" aria-hidden="true" />
          <p className="hero-note">2026년 9월 5일 토요일 12시<br />아산 가든블룸</p>
        </section>

        <section className="message-section">
          <div className="ribbon-wrap">
            <Image src="/Ribbon.svg" alt="리본 아이콘" width={42} height={36} className="ribbon-img" priority />
          </div>
          <h2>초대합니다</h2>
          <div className="message-copy">
            <p>여름 끝자락에 태어난 도현이가<br />네 번의 계절을 지나 다시 여름의 끝자락을 맞았습니다.</p>
            <p>지난 일 년 동안 따뜻한 사랑과 관심을 보내주신 분들과<br />첫 번째 생일의 기쁨을 함께 나누고자<br />작은 자리를 마련했습니다.</p>
            <p>바쁘시겠지만 소중한 걸음으로 함께하시어<br />도현이의 첫 생일을 따뜻하게 축복해 주시면 감사하겠습니다.</p>
          </div>
          <p className="parents-info">아빠 차OO &nbsp;|&nbsp; 엄마 주현선</p>
        </section>

        <section className="photo-section" aria-label="가족 사진">
          <div className="wide-photo-wrap">
            <Image className="wide-photo" src="/Family.png" alt="도현이네 가족 사진" width={1600} height={1067} priority />
          </div>
        </section>

        {/* 갤러리 섹션 */}
        <section className="gallery-section">
          <h2>갤러리</h2>
          <div className="gallery-grid">
            {galleryImages.map((src, index) => (
              <button key={index} type="button" className="gallery-thumb" onClick={() => openModal(index)}>
                <Image src={src} alt={`갤러리 사진 ${index + 1}`} fill unoptimized style={{ objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </section>

        <section className="event-section">
          <h2>오시는 길</h2>
          <p className="address-text">
            충남 아산시 둔포면 충무로 1222-10<br />
            가든블룸
          </p>
          <div ref={mapElement} className="naver-map"></div>

          <div className="map-action-bar">
            <a
              href="https://map.naver.com/p/search/아산%20가든블룸"
              target="_blank"
              rel="noopener noreferrer"
              className="map-action-link"
            >
              네이버지도
            </a>
            <span className="map-action-divider" aria-hidden="true">|</span>
            <a
              href="https://map.kakao.com/?q=아산 가든블룸"
              target="_blank"
              rel="noopener noreferrer"
              className="map-action-link"
            >
              카카오맵
            </a>
            <span className="map-action-divider" aria-hidden="true">|</span>
            <a
              href="https://tmap.co.kr/tmap2/mobile/route.jsp?name=아산+가든블룸&lat=36.9158102&lon=127.0285499"
              target="_blank"
              rel="noopener noreferrer"
              className="map-action-link"
            >
              티맵
            </a>
          </div>
        </section>

        <section className="letter-section">
          <p>저 멀리, 계절의 끝에서 작은 숨결 하나가<br />우리에게 와 도현이라는 이름이 되었습니다.</p>
          <p>작고 따뜻한 손을 잡고 걷는 하루하루가<br />우리에게는 처음 만나는 빛이었습니다.</p>
          <p>도현이가 처음 맞는 생일,<br />소중한 분들과 그 기쁨을 나누고 싶습니다.</p>
          <span className="letter-sign">With love, for Dohyun</span>
        </section>
      </article>

      {/* 전체화면 라이트박스 모달 */}
      {selectedIndex !== null && (
        <div className="lightbox-overlay" onClick={closeModal}>
          <button type="button" className="lightbox-close" onClick={closeModal} aria-label="닫기">
            ✕
          </button>
          
          <button type="button" className="lightbox-arrow left" onClick={prevImage} aria-label="이전 사진">
            ‹
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[selectedIndex]}
              alt={`도현이 사진 ${selectedIndex + 1}`}
              width={1000}
              height={1000}
              unoptimized
              style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain' }}
            />
            <div className="lightbox-counter">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </div>

          <button type="button" className="lightbox-arrow right" onClick={nextImage} aria-label="다음 사진">
            ›
          </button>
        </div>
      )}
    </main>
  );
}