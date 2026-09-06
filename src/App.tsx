import { useEffect, useRef } from 'react'
import './App.css'

const HERO_VIDEO_PATH = `${import.meta.env.BASE_URL}15172.mp4?v=20260906-2`

function App() {
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch {
        // Autoplay can be deferred by the browser until the media is ready.
      }
    }

    playVideo()

    const handleVisibility = () => {
      if (!document.hidden) playVideo()
    }

    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <main>

      {/* ==========================================
          NAVIGATION
      ========================================== */}

      <header className="site-nav">

        <a
          href="#"
          className="brand"
        >
          <span className="brand-mark">
            Q
          </span>

          <span className="brand-name">
            PONDOK
          </span>
        </a>

        <nav>
          <a href="#tentang">
            Tentang
          </a>

          <a href="#pendidikan">
            Pendidikan
          </a>

          <a href="#program">
            Program
          </a>

          <a href="#pendaftaran">
            Pendaftaran
          </a>
        </nav>

        <button
          className="menu-button"
          aria-label="Menu"
        >
          <span />
          <span />
        </button>

      </header>


      {/* ==========================================
          CINEMATIC HERO
      ========================================== */}

      <section
        id="cinematic-hero"
        className="cinematic-hero"
      >

        <div className="hero-sticky">

          <video
            ref={heroVideoRef}
            className="hero-video"
            src={HERO_VIDEO_PATH}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Animasi Al-Qur'an"
          />

          <div className="hero-vignette" />
          <div className="hero-video-glow" />

          <div className="hero-copy">

            <p className="eyebrow">
              PONDOK PESANTREN TAHFIDZ
            </p>

            <h1>
              Menjaga Wahyu.
              <br />
              Membentuk Generasi.
            </h1>

          </div>

          <div className="hero-scroll">

            <span>
              SCROLL
            </span>

            <span className="scroll-line" />

          </div>

        </div>

      </section>


      {/* ==========================================
          STATEMENT
      ========================================== */}

      <section
        className="statement-section"
      >

        <div className="section-index">
          01
        </div>

        <div className="statement-content">

          <p className="eyebrow">
            [SECTION LABEL]
          </p>

          <h2>
            [HEADLINE BESAR]
          </h2>

          <p>
            [Supporting text akan kita
            masukkan pada tahap akhir.]
          </p>

        </div>

      </section>


      {/* ==========================================
          TENTANG
      ========================================== */}

      <section
        id="tentang"
        className="about-section"
      >

        <div className="section-index">
          02
        </div>

        <div className="about-grid">

          <div className="about-image">
            <div className="image-placeholder">
              IMAGE
            </div>
          </div>

          <div className="about-content">

            <p className="eyebrow">
              [TENTANG KAMI]
            </p>

            <h2>
              [Headline tentang
              pesantren]
            </h2>

            <p>
              [Deskripsi pesantren
              akan dimasukkan nanti.]
            </p>

            <a
              href="#"
              className="text-link"
            >
              [Pelajari lebih lanjut]
              <span>↗</span>
            </a>

          </div>

        </div>

      </section>


      {/* ==========================================
          PENDIDIKAN
      ========================================== */}

      <section
        id="pendidikan"
        className="method-section"
      >

        <div className="section-index">
          03
        </div>

        <div className="method-heading">

          <p className="eyebrow">
            [PENDEKATAN]
          </p>

          <h2>
            [Cara kami
            mendidik]
          </h2>

        </div>

        <div className="method-list">

          <article>
            <span>01</span>

            <h3>
              [PRINSIP PERTAMA]
            </h3>

            <p>
              [Deskripsi]
            </p>
          </article>

          <article>
            <span>02</span>

            <h3>
              [PRINSIP KEDUA]
            </h3>

            <p>
              [Deskripsi]
            </p>
          </article>

          <article>
            <span>03</span>

            <h3>
              [PRINSIP KETIGA]
            </h3>

            <p>
              [Deskripsi]
            </p>
          </article>

        </div>

      </section>


      {/* ==========================================
          LIFE
      ========================================== */}

      <section
        className="life-section"
      >

        <div className="section-index">
          04
        </div>

        <div className="life-header">

          <p className="eyebrow">
            [KEHIDUPAN SANTRI]
          </p>

          <h2>
            [A day at the pondok]
          </h2>

        </div>

        <div className="life-grid">

          <div className="life-image life-image-large">
            IMAGE
          </div>

          <div className="life-image">
            IMAGE
          </div>

          <div className="life-image">
            IMAGE
          </div>

        </div>

      </section>


      {/* ==========================================
          PROGRAM
      ========================================== */}

      <section
        id="program"
        className="program-section"
      >

        <div className="section-index">
          05
        </div>

        <div className="program-heading">

          <p className="eyebrow">
            [PROGRAM]
          </p>

          <h2>
            [Program pendidikan]
          </h2>

        </div>

        <div className="program-list">

          <article>
            <span>01</span>

            <div>
              <h3>
                [Program Tahfidz]
              </h3>

              <p>
                [Deskripsi program]
              </p>
            </div>

            <span className="arrow">
              ↗
            </span>
          </article>

          <article>
            <span>02</span>

            <div>
              <h3>
                [Program Pendidikan]
              </h3>

              <p>
                [Deskripsi program]
              </p>
            </div>

            <span className="arrow">
              ↗
            </span>
          </article>

          <article>
            <span>03</span>

            <div>
              <h3>
                [Program Pembinaan]
              </h3>

              <p>
                [Deskripsi program]
              </p>
            </div>

            <span className="arrow">
              ↗
            </span>
          </article>

        </div>

      </section>


      {/* ==========================================
          PEOPLE
      ========================================== */}

      <section
        className="people-section"
      >

        <div className="section-index">
          06
        </div>

        <div className="people-heading">

          <p className="eyebrow">
            [PENGASUH & PENDIDIK]
          </p>

          <h2>
            [People behind
            the mission]
          </h2>

        </div>

        <div className="people-grid">

          <article>
            <div className="portrait">
              PORTRAIT
            </div>

            <p>
              [NAMA]
            </p>

            <span>
              [JABATAN]
            </span>
          </article>

          <article>
            <div className="portrait">
              PORTRAIT
            </div>

            <p>
              [NAMA]
            </p>

            <span>
              [JABATAN]
            </span>
          </article>

          <article>
            <div className="portrait">
              PORTRAIT
            </div>

            <p>
              [NAMA]
            </p>

            <span>
              [JABATAN]
            </span>
          </article>

        </div>

      </section>


      {/* ==========================================
          ADMISSION
      ========================================== */}

      <section
        id="pendaftaran"
        className="admission-section"
      >

        <div className="section-index">
          07
        </div>

        <div className="admission-content">

          <p className="eyebrow">
            [PENDAFTARAN]
          </p>

          <h2>
            [Mulai perjalanan
            bersama kami.]
          </h2>

          <a
            href="#"
            className="admission-button"
          >
            [Informasi Pendaftaran]
            <span>↗</span>
          </a>

        </div>

      </section>


      {/* ==========================================
          FINAL
      ========================================== */}

      <section
        className="final-section"
      >

        <p className="eyebrow">
          [FINAL STATEMENT]
        </p>

        <h2>
          [Kalimat penutup]
        </h2>

        <div className="final-mark">
          Q
        </div>

      </section>


      {/* ==========================================
          FOOTER
      ========================================== */}

      <footer className="site-footer">

        <div>
          <span className="footer-brand">
            PONDOK
          </span>

          <span>
            [Alamat]
          </span>
        </div>

        <div>
          <span>
            [WhatsApp]
          </span>

          <span>
            [Email]
          </span>
        </div>

        <div>
          <span>
            © 2026
          </span>
        </div>

      </footer>

    </main>
  )
}

export default App