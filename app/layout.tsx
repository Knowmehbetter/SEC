import type React from "react"
import { Plus_Jakarta_Sans, Manrope, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-head",
  weight: ["600", "700", "800"],
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "700"],
})

export const metadata = {
  title: "STREAMERS EQUITY INDEX",
  description: "Minimal, immersive live video with in-stream crypto actions",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${manrope.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <script src="https://www.youtube.com/iframe_api" async></script>
      </head>
      <body className="antialiased">
        {children}
        <div id="clipModal" className="clip-modal" hidden aria-hidden="true">
          <button className="clip-close" aria-label="Close">
            ×
          </button>
          <video id="clipPlayer" controls playsInline preload="metadata"></video>
        </div>
        <div id="sex-tvchart" className="stream-wrap" data-hero-media>
          {/* SEX TV viewer system with animated boy silhouette and parallax */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (() => { 'use strict';
                  // === Your YouTube link ===
                  const YT_URL = "https://youtu.be/5a7msMDBKDI";

                  const box = document.querySelector('[data-hero-media]');
                  if (!box) {
                    console.log('[v0] Video container not found');
                    return;
                  }

                  console.log('[v0] Found video container, loading YouTube embed');

                  // Extract the 11-char video id from any YouTube URL
                  const toId = (u) => {
                    const m = String(u).match(/(?:youtu\\.be\\/|youtube\\.com\\/(?:watch\\?.*v=|embed\\/|shorts\\/))([\A-Za-z0-9_-]{11})/);
                    return m ? m[1] : String(u).slice(-11);
                  };
                  const id = toId(YT_URL);

                  // Remove only the obvious placeholder image
                  const ph = box.querySelector('img');
                  if (ph) {
                    console.log('[v0] Removing placeholder image');
                    ph.remove();
                  }

                  // Build privacy-friendly embed (no cookies), autoplay muted, loop
                  const src = \`https://www.youtube-nocookie.com/embed/\${id}?\` +
                              \`autoplay=1&mute=1&controls=0&playsinline=1&rel=0&iv_load_policy=3&\` +
                              \`modestbranding=1&loop=1&playlist=\${id}&enablejsapi=1\`;

                  let iframe = document.createElement('iframe');
                  iframe.className = 'hero-yt';
                  iframe.src = src;
                  iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
                  iframe.referrerPolicy = 'no-referrer';

                  console.log('[v0] Creating YouTube iframe with src:', src);

                  // Some builders inject sandbox and break autoplay/API — remove it defensively
                  const unsandbox = () => { if (iframe.hasAttribute('sandbox')) iframe.removeAttribute('sandbox'); };
                  new MutationObserver(unsandbox).observe(iframe, { attributes: true, attributeFilter: ['sandbox']});
                  unsandbox();

                  // Insert behind your overlays
                  box.prepend(iframe);

                  // Cover-fit the 16:9 player inside any box shape
                  function coverYT(){
                    const r = box.getBoundingClientRect();
                    const rw = r.width, rh = r.height, rv = 16/9;
                    const rc = rw / rh;
                    if (rc > rv) { // container wider than 16:9: set width=100%, height to cover
                      const h = rw / rv;
                      Object.assign(iframe.style, { width: rw+'px', height: h+'px' });
                    } else {       // container taller: set height=100%, width to cover
                      const w = rh * rv;
                      Object.assign(iframe.style, { width: w+'px', height: rh+'px' });
                    }
                  }
                  coverYT();
                  new ResizeObserver(coverYT).observe(box);

                  // Pause/play when visible (uses YouTube postMessage API)
                  const post = (fn) => {
                    try { iframe.contentWindow.postMessage(JSON.stringify({ event:'command', func: fn, args: [] }), '*'); } catch {}
                  };
                  const io = new IntersectionObserver(es => {
                    es.forEach(e => e.isIntersecting ? post('playVideo') : post('pauseVideo'));
                  }, { threshold: 0.2 });
                  io.observe(box);

                  // Respect reduced motion
                  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { post('pauseVideo'); }

                  console.log('[v0] YouTube embed setup complete');
                })();
              `,
            }}
          />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                // opt-in via: data-anim="chars" or data-anim="words"
                const els = document.querySelectorAll('[data-anim]');
                els.forEach(el => {
                  const mode = el.getAttribute('data-anim');
                  const txt  = el.textContent;
                  el.textContent = '';
                  if (mode === 'chars') {
                    [...txt].forEach((ch,i) => {
                      const s = document.createElement('span');
                      s.className = 'fx-char'; s.style.setProperty('--i', i);
                      s.textContent = ch; el.appendChild(s);
                    });
                  } else {
                    txt.split(/\\s+/).forEach((w,i) => {
                      const s = document.createElement('span');
                      s.className = 'fx-word'; s.style.setProperty('--i', i);
                      s.textContent = w + ' '; el.appendChild(s);
                    });
                  }
                });

                // intersection reveal
                const io = new IntersectionObserver((ents)=>{
                  ents.forEach(e => { if (e.isIntersecting) e.target.classList.add('fx-in'); });
                }, { threshold: .2 });
                document.querySelectorAll('[data-anim]').forEach(el => io.observe(el));
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', () => {
                const b = document.querySelector('.sex-brand.fx-underline');
                if (b) { 
                  b.classList.add('fx-active'); 
                  setTimeout(()=>b.classList.remove('fx-active'), 1400); 
                }
              });
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              /* TYPEWRITER: opt-in with [data-type]. Supports multiple phrases via data-phrases="a|b|c" */
              (() => {
                const els = document.querySelectorAll('[data-type]');
                els.forEach(el => {
                  const phrases = (el.dataset.phrases || el.textContent || "").split('|').map(s=>s.trim()).filter(Boolean);
                  if (!phrases.length) return;
                  const speed = +(el.dataset.speed || 42);   // typing speed (ms per char)
                  const erase = +(el.dataset.erase || 28);   // erase speed
                  const pause = +(el.dataset.pause || 1100); // pause at full word
                  const loop  = (el.dataset.loop ?? "true") !== "false";

                  el.classList.add('fx-type');
                  el.textContent = "";

                  let i = 0, p = 0, typing = true;
                  function tick(){
                    const text = phrases[p];
                    if (typing){
                      el.textContent = text.slice(0, ++i);
                      if (i === text.length){ typing = false; return void setTimeout(tick, pause); }
                      return void setTimeout(tick, speed);
                    } else {
                      el.textContent = text.slice(0, --i);
                      if (i === 0){
                        p = (p + 1) % phrases.length;
                        if (!loop && p === 0){ el.textContent = phrases[0]; return; }
                        typing = true; return void setTimeout(tick, 300);
                      }
                      return void setTimeout(tick, erase);
                    }
                  }
                  tick();
                });
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                // ====== CONFIG (tweak intensity by toggling flags) ======
                const ENABLE = {
                  chroma:  true,   // colored edge fringe
                  jitter:  true,   // tiny sub-pixel shake
                  scan:    true,   // scanlines
                  roll:    true,   // rolling bright bar
                  vignette:true,   // dark edge
                  noise:   true    // animated film grain
                };

                const wrap = document.querySelector('.stream-wrap');
                const vid  = wrap?.querySelector('video');
                if (!wrap || !vid) return;

                // tag classes (no style collisions)
                wrap.classList.add('sex-tv');
                if (ENABLE.chroma) wrap.classList.add('sex-chroma');
                if (ENABLE.jitter) wrap.classList.add('sex-jitter');

                // overlays
                if (ENABLE.scan){
                  const scan = document.createElement('div'); scan.className = 'sex-scan'; wrap.appendChild(scan);
                }
                if (ENABLE.roll){
                  const roll = document.createElement('div'); roll.className = 'sex-roll'; wrap.appendChild(roll);
                }
                if (ENABLE.vignette){
                  const vig = document.createElement('div'); vig.className = 'sex-vignette'; wrap.appendChild(vig);
                }
                if (ENABLE.noise){
                  const c = document.createElement('canvas'); c.className = 'sex-noise'; wrap.appendChild(c);
                  const ctx = c.getContext('2d', { willReadFrequently:false });

                  function fit(){ c.width = wrap.clientWidth; c.height = wrap.clientHeight; }
                  fit(); new ResizeObserver(fit).observe(wrap);

                  let raf, hidden = document.hidden;
                  document.addEventListener('visibilitychange', ()=>{ hidden = document.hidden; });

                  function frame(){
                    if (hidden) { raf = requestAnimationFrame(frame); return; }
                    const {width:w, height:h} = c;
                    const id = ctx.createImageData(w, h);
                    const d = id.data;
                    // Sparse noise for performance
                    for (let i=0, n=w*h*4; i<n; i+=4){
                      const v = (Math.random()*255)|0; // 0..255
                      const a = (Math.random() < .08) ? 48 : 0; // 8% pixels
                      d[i] = d[i+1] = d[i+2] = v; d[i+3] = a;
                    }
                    ctx.putImageData(id, 0, 0);
                    raf = requestAnimationFrame(frame);
                  }
                  frame();
                }

                // Optional: "glitch burst" when user clicks overlay buttons (X/Pump.fun/CA)
                document.addEventListener('click', (e) => {
                  const t = e.target.closest('[data-action], .icon-btn, a, button');
                  if (!t) return;
                  wrap.animate(
                    [
                      { filter:'none' },
                      { filter:'hue-rotate(10deg) contrast(1.25) saturate(1.25)' , offset:.15 },
                      { filter:'none' }
                    ],
                    { duration: 220, easing:'ease-out' }
                  );
                });
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const modal = document.getElementById('clipModal');
                const player = document.getElementById('clipPlayer');
                const close = modal?.querySelector('.clip-close');

                function closeModal() {
                  console.log('[v0] Closing clip modal');
                  if (player && modal) {
                    player.pause();
                    player.removeAttribute('src');
                    player.load();
                    modal.hidden = true;
                    modal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = ''; // restore body scroll
                  }
                }

                if (close) {
                  console.log('[v0] Close button found, adding click listener');
                  close.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModal();
                  });
                } else {
                  console.log('[v0] Close button not found');
                }
                
                if (modal) {
                  modal.addEventListener('click', e => { 
                    if (e.target === modal) {
                      console.log('[v0] Clicked outside modal, closing');
                      closeModal(); 
                    }
                  });
                }
                
                window.addEventListener('keydown', e => { 
                  if (e.key === 'Escape' && modal && !modal.hidden) {
                    console.log('[v0] Escape key pressed, closing modal');
                    closeModal(); 
                  }
                });

                window.closeClipModal = closeModal;
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                // 🔧 Asset URLs for the first clip
                const CLIP1_POSTER_URL = "/images/gen-z-quant-poster.jpg";
                const CLIP1_VIDEO_URL  = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Kid%20Rugs%20Pulls%2020k%20on%20Solana%20Memecoin%20pump.fun%20Quant%20thanks%20for%20the%2020%20bandos%20-%20Pudges%20%F0%9F%94%B4%20%28720p%2C%20h264%29-bZOAAim8Jyxq9U52EfOLDJBRjArx6w.mp4";
                const CLIP1_TITLE      = "Gen Z Quant (Pump.fun)";

                // Try to grab the first card in the Clips section
                let card = document.querySelector('#clip-1')
                       || document.querySelector('.clips-grid .card')
                       || document.querySelector('[data-section="clips"] .card')
                       || document.querySelector('.clips .card');
                if (!card) return;

                // Find the existing thumbnail area
                let thumb = card.querySelector('.clip-thumb');
                if (!thumb) {
                  thumb = document.createElement('div');
                  thumb.className = 'clip-thumb';
                  // If an <img> exists, put the wrapper around it
                  const img0 = card.querySelector('img');
                  if (img0) img0.replaceWith(thumb);
                  else card.prepend(thumb);
                } else {
                  // remove any old click → modal handlers that may exist
                  thumb.replaceWith(thumb.cloneNode(true));     // fast way to drop listeners
                  thumb = card.querySelector('.clip-thumb');
                }

                // Build the inline <video>
                const video = document.createElement('video');
                video.className = 'clip-vid';
                video.setAttribute('poster', CLIP1_POSTER_URL);
                video.setAttribute('preload', 'metadata');
                video.setAttribute('playsinline', '');
                video.muted = true;           // autoplay policies
                video.controls = false;       // keep clean; we'll toggle on click if you want
                video.src = CLIP1_VIDEO_URL;

                // Overlays: play indicator + duration badge
                const playOverlay = document.createElement('div');
                playOverlay.className = 'clip-play';
                playOverlay.innerHTML = '▶';
                const dur = document.createElement('span');
                dur.className = 'clip-duration';
                dur.textContent = '0:00';

                thumb.innerHTML = '';                       // clear
                thumb.append(video, playOverlay, dur);

                // Fill duration from metadata
                video.addEventListener('loadedmetadata', () => {
                  const d = Math.floor(video.duration || 0);
                  const mm = Math.floor(d / 60);
                  const ss = String(d % 60).padStart(2, '0');
                  dur.textContent = \`\${mm}:\${ss}\`;
                }, { once:true });

                // Desktop: autoplay on hover (muted, loop). Mobile: tap to play/pause.
                const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

                if (canHover) {
                  video.loop = true;
                  thumb.addEventListener('mouseenter', () => { video.play().catch(()=>{}); });
                  thumb.addEventListener('mouseleave', () => { video.pause(); });
                }

                // Click toggles play/pause; show/hide overlay
                thumb.style.cursor = 'pointer';
                thumb.addEventListener('click', () => {
                  if (video.paused) { video.play().catch(()=>{}); }
                  else { video.pause(); }
                });

                video.addEventListener('play',  () => card.classList.add('clip-playing'));
                video.addEventListener('pause', () => card.classList.remove('clip-playing'));

                // Update the visible image elements (if any titles/thumbnails elsewhere)
                const imgInCard = card.querySelector('img');
                if (imgInCard) { imgInCard.src = CLIP1_POSTER_URL; imgInCard.alt = CLIP1_TITLE; }

              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                // Pair address for $SEX token
                const PAIR = "bp7hbdsc6s4dwmekxo9gmzrgiydp5fcjchspdgqlqvjr"; // solana pair
                const base = \`https://dexscreener.com/solana/\${PAIR}\`;
                const frame = document.getElementById('sexDexFrame');
                const open  = document.getElementById('sexDexOpen');

                if (!frame || !open) return;

                function theme() {
                  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
                }

                function srcForTheme() {
                  // Dexscreener supports an embeddable view:
                  //   ?embed=1&theme=dark|light&chart=1&trades=0&info=0
                  return \`\${base}?embed=1&theme=\${theme()}&chart=1&trades=0&info=0\`;
                }

                // initial load
                frame.src = srcForTheme();
                open.href  = base;

                // update when your theme toggles
                const mo = new MutationObserver(() => { frame.src = srcForTheme(); });
                mo.observe(document.documentElement, { attributes:true, attributeFilter:['class'] });

                // optional: focus trap on iframe for a11y
                frame.setAttribute('aria-label', 'Dexscreener live chart');

                // fallback text if embedding is blocked (rare)
                frame.addEventListener('error', () => {
                  frame.replaceWith(Object.assign(document.createElement('div'), {
                    className: 'sex-tvchart__screen',
                    innerHTML: \`<div style="display:grid;place-items:center;height:100%;color:#9aa6b2">
                      Unable to load embed. <a href="\${base}" target="_blank" rel="noopener" style="margin-left:6px">Open on Dexscreener ↗</a>
                    </div>\`
                  }));
                });
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('fonts' in document) {
                document.fonts.ready.then(() => document.documentElement.classList.add('fonts-loaded'));
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
