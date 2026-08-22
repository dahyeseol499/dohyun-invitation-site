import Image from 'next/image';

export default function Home() {
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
            <Image className="portrait" src="/dohyeon.png" alt="한복을 입은 도현이" width={420} height={420} priority />
          </div>
          <p className="script-name">Dohyun</p>
          <span className="short-rule" aria-hidden="true" />
          <p className="hero-note">2026년 9월 5일 토요일 12시<br />아산 가든블룸</p>
        </section>

        <section className="message-section">
          <div className="ribbon" aria-hidden="true">⌁</div>
          <h2>초대합니다</h2>
          <div className="message-copy">
            <p>여름 끝자락에 태어난 도현이가<br />네 번의 계절을 지나 다시 여름의 끝자락을 맞았습니다.</p>
            <p>지난 일 년 동안 따뜻한 사랑과 관심을 보내주신 분들과<br />첫 번째 생일의 기쁨을 함께 나누고자<br />작은 자리를 마련했습니다.</p>
            <p>바쁘시겠지만 소중한 걸음으로 함께하시어<br />도현이의 첫 생일을 따뜻하게 축복해 주시면 감사하겠습니다.</p>
          </div>
        </section>

        <section className="photo-section" aria-label="도현이 사진">
          <div className="wide-photo-wrap">
            <Image className="wide-photo" src="/dohyeon.png" alt="한복을 입고 앉아 있는 도현이" width={1600} height={1067} />
          </div>
        </section>

        <section className="event-section">
          <p className="section-kicker">돌잔치 안내</p>
          <h2>도현이의 첫 생일</h2>
          <p className="pending-detail">2026년 9월 5일 토요일 12시<br />아산 가든블룸</p>
          <div className="directions">
            <p className="section-kicker">오시는 길</p>
            <div className="map-placeholder"><span>아산 가든블룸</span></div>
          </div>
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
