'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    naver: any;
    Kakao: any;
  }
}

const INVITATION_URL = 'https://dohyun-invitation.vercel.app/';

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
  '/gallery/Dohyun-10.jpeg',
  '/gallery/Dohyun-11.jpeg',
  '/gallery/Dohyun-12.jpeg',
  '/gallery/Dohyun-13.jpeg',
];

const MIN_SWIPE_DISTANCE = 50;
const CONTROLS_HIDE_DELAY = 2500;

const PARTY = { year: 2026, month: 9, day: 5 };

function getKstToday() {
  const todayStr = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const [y, m, d] = todayStr.split('-').map(Number);
  return Date.UTC(y, m - 1, d);
}

function daysTo({ year, month, day }: { year: number; month: number; day: number }) {
  return Math.round((Date.UTC(year, month - 1, day) - getKstToday()) / 86400000);
}

function DayCounter() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const toParty = daysTo(PARTY);

    if (toParty > 0) {
      setLabel(`도현이 돌잔치까지 D-${toParty}`);
    } else if (toParty === 0) {
      setLabel('오늘은 도현이 돌잔치 날이에요');
    } else {
      setLabel('함께해 주셔서 감사했습니다');
    }
  }, []);

  if (label === null) return null;

  return <p className="dday">{label}</p>;
}

export default function Home() {
  const mapElement = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLightboxOpen = selectedIndex !== null;

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setControlsVisible(false), CONTROLS_HIDE_DELAY);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(INVITATION_URL);
      alert('초대장 주소가 복사되었습니다.');
    }
  };

  const KAKAO_JAVASCRIPT_KEY = '967fd25acd99fdd3bded0bef01106fc0';
  const KAKAO_TEMPLATE_ID = 136469;

  const handleShareKakao = () => {
    if (typeof window === 'undefined') return;

    const { Kakao } = window;

    if (Kakao) {
      if (!Kakao.isInitialized()) {
        Kakao.init(KAKAO_JAVASCRIPT_KEY);
      }

      Kakao.Share.sendCustom({ templateId: KAKAO_TEMPLATE_ID });
    }
  };

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

    const map = new window.naver.maps.Map(mapElement.current, {
      center: location,
      zoom: 16,
      zoomControl: false,
      scaleControl: false,
      mapDataControl: false,
    });

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

  useEffect(() => {
    if (!isLightboxOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';

      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = prev;
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    showControls();

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setControlsVisible(true);
    };
  }, [isLightboxOpen, showControls]);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    showControls();
    setSelectedIndex((prev) =>
      prev === null ? null : prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    showControls();
    setSelectedIndex((prev) =>
      prev === null ? null : prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const onTouchStart = (e: React.TouchEvent) => {
    showControls();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;

    if (distance > MIN_SWIPE_DISTANCE) {
      nextImage();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      prevImage();
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
          <p className="hero-note">2026년 9월 5일 토요일 11시 30분<br />아산 가든블룸</p>
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
          <p className="parents-info">아빠 차지훈 &nbsp;|&nbsp; 엄마 주현선</p>
        </section>

        <section className="photo-section" aria-label="가족 사진">
          <div className="wide-photo-wrap">
            <Image className="wide-photo" src="/Family.png" alt="도현이네 가족 사진" width={1600} height={1067} priority />
          </div>
        </section>

        <section className="gallery-section">
          <h2>갤러리</h2>
          <div className="gallery-grid">
            {galleryImages.slice(0, 9).map((src, index) => (
              <button key={src} type="button" className="gallery-thumb" onClick={() => openModal(index)}>
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
            <a href="https://map.naver.com/p/search/아산%20가든블룸" target="_blank" rel="noopener noreferrer" className="map-action-link">
              네이버지도
            </a>
            <span className="map-action-divider" aria-hidden="true">|</span>
            <a href="https://map.kakao.com/?q=아산 가든블룸" target="_blank" rel="noopener noreferrer" className="map-action-link">
              카카오맵
            </a>
            <span className="map-action-divider" aria-hidden="true">|</span>
            <a href="https://tmap.co.kr/tmap2/mobile/route.jsp?name=아산+가든블룸&lat=36.9158102&lon=127.0285499" target="_blank" rel="noopener noreferrer" className="map-action-link">
              티맵
            </a>
          </div>
        </section>

        <section className="share-section">
          <button type="button" className="share-btn kakao-btn" onClick={handleShareKakao}>
            <span>카카오톡으로 초대장 전하기</span>
            <svg className="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>

          <button type="button" className="share-btn copy-btn" onClick={handleCopyLink}>
            <span>초대장 주소 복사하기</span>
            <svg className="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </section>

        <section className="letter-section">
          <DayCounter />
          <p className="letter-sign">With love, for Dohyun</p>
        </section>
      </article>

      {selectedIndex !== null && (
        <div
          className={`lightbox-overlay${controlsVisible ? '' : ' controls-hidden'}`}
          onClick={closeModal}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button type="button" className="lightbox-close" onClick={closeModal} aria-label="닫기">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6 L18 18 M18 6 L6 18" />
            </svg>
          </button>

          <button type="button" className="lightbox-arrow left" onClick={prevImage} aria-label="이전 사진">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 4 L7 12 L15 20" />
            </svg>
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => {
              e.stopPropagation();
              showControls();
            }}
          >
            <Image
              src={galleryImages[selectedIndex]}
              alt={`도현이 사진 ${selectedIndex + 1}`}
              width={1000}
              height={1000}
              unoptimized
              sizes="100vw"
            />
            <div className="lightbox-counter">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </div>

          <button type="button" className="lightbox-arrow right" onClick={nextImage} aria-label="다음 사진">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 4 L17 12 L9 20" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
}