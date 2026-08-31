import { useEffect, useRef } from 'react'
import './App.css'

const FRAME_COUNT = 154

const framePath = (frame: number) =>
  `/frames/frame-${String(frame).padStart(4, '0')}.jpg`

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  )

  const loadedRef = useRef<boolean[]>(
    Array(FRAME_COUNT).fill(false)
  )

  const currentFrameRef = useRef(0)
  const targetFrameRef = useRef(0)

  const rafRef = useRef<number | null>(null)

  // --------------------------------------------------
  // CANVAS
  // --------------------------------------------------

  const renderFrame = (frameIndex: number) => {
    const canvas = canvasRef.current
    const image = imagesRef.current[frameIndex]

    if (!canvas || !image || !image.complete) return
    if (!image.naturalWidth || !image.naturalHeight) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const width = rect.width
    const height = rect.height

    const pixelWidth = Math.round(width * dpr)
    const pixelHeight = Math.round(height * dpr)

    if (
      canvas.width !== pixelWidth ||
      canvas.height !== pixelHeight
    ) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, width, height)

    const imageRatio =
      image.naturalWidth / image.naturalHeight

    const viewportRatio = width / height

    let drawWidth = width
    let drawHeight = height

    if (imageRatio > viewportRatio) {
      drawHeight = height
      drawWidth = height * imageRatio
    } else {
      drawWidth = width
      drawHeight = width / imageRatio
    }

    const x = (width - drawWidth) / 2
    const y = (height - drawHeight) / 2

    ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    )
  }

  // --------------------------------------------------
  // LOAD FRAME
  // --------------------------------------------------

  const loadFrame = (index: number) => {
    if (index < 0 || index >= FRAME_COUNT) return
    if (imagesRef.current[index]) return

    const image = new Image()

    image.src = framePath(index + 1)

    image.onload = () => {
      imagesRef.current[index] = image
      loadedRef.current[index] = true

      if (
        index ===
        Math.round(currentFrameRef.current)
      ) {
        renderFrame(index)
      }
    }

    image.onerror = () => {
      console.warn(
        `Could not load ${framePath(index + 1)}`
      )
    }
  }

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    loadFrame(0)

    let next = 1

    const preload = () => {
      const batchSize = 12
      const end = Math.min(
        next + batchSize,
        FRAME_COUNT
      )

      for (let i = next; i < end; i++) {
        loadFrame(i)
      }

      next = end

      if (next < FRAME_COUNT) {
        window.setTimeout(preload, 100)
      }
    }

    const timeout = window.setTimeout(preload, 100)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [])

  // --------------------------------------------------
  // SCROLL → FRAME
  // --------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      const hero =
        document.getElementById('cinematic-hero')

      if (!hero) return

      const rect = hero.getBoundingClientRect()

      const scrollDistance =
        hero.offsetHeight -
        window.innerHeight

      if (scrollDistance <= 0) return

      const travelled = Math.min(
        Math.max(-rect.top, 0),
        scrollDistance
      )

      const progress =
        travelled / scrollDistance

      targetFrameRef.current =
        progress * (FRAME_COUNT - 1)
    }

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    )

    handleScroll()

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll
      )
    }
  }, [])

  // --------------------------------------------------
  // FRAME ANIMATION
  // --------------------------------------------------

  useEffect(() => {
    const animate = () => {
      const current =
        currentFrameRef.current

      const target =
        targetFrameRef.current

      const difference = target - current

      if (Math.abs(difference) < 0.03) {
        currentFrameRef.current = target
      } else {
        currentFrameRef.current +=
          difference * 0.2
      }

      const frameIndex = Math.round(
        currentFrameRef.current
      )

      if (loadedRef.current[frameIndex]) {
        renderFrame(frameIndex)
      }

      rafRef.current =
        requestAnimationFrame(animate)
    }

    rafRef.current =
      requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        )
      }
    }
  }, [])

  // --------------------------------------------------
  // RESIZE
  // --------------------------------------------------

  useEffect(() => {
    const handleResize = () => {
      renderFrame(
        Math.round(
          currentFrameRef.current
        )
      )
    }

    window.addEventListener(
      'resize',
      handleResize
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      )
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

          <canvas
            ref={canvasRef}
            className="hero-canvas"
          />

          <div className="hero-vignette" />

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