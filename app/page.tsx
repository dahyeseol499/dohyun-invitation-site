'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    naver: any;
  }
}

export default function Home() {
  const [mapLoaded, setMapLoaded] = useState(false);

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
    if (!mapLoaded) return;

    // 아산 가든블룸 위치 좌표
    const location = new window.naver.maps.LatLng(36.9158102, 127.0285499);

    const mapOptions = {
      center: location,
      zoom: 16,
      zoomControl: false,
      scaleControl: false,
      mapDataControl: false,
    };

    const map = new window.naver.maps.Map('map', mapOptions);

    new window.naver.maps.Marker({
      position: location,
      map: map,
      title: '가든블룸',
    });
  }, [mapLoaded]);

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

        <section className="event-section">
          <h2>오시는 길</h2>
          <p className="address-text">
            충남 아산시 둔포면 충무로 1222-10<br />
            가든블룸
          </p>
          <div id="map" className="naver-map"></div>
        </section>

        <section className="letter-section">
          <p>저 멀리, 계절의 끝에서 작은 숨결 하나가<br />우리에게 와 도현이라는 이름이 되었습니다.</p>
          <p>작고 따뜻한 손을 잡고 걷는 하루하루가<br />우리에게는 처음 만나는 빛이었습니다.</p>
          <p>도현이가 처음 맞는 생일,<br />소중한 분들과 그 기쁨을 나누고 싶습니다.</p>
          <span className="letter-sign">With love, for Dohyun</span>
        </section>
      </article>
    </main>
  );
}