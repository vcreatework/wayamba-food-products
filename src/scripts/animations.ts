import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Wrap each word of [data-split] headings so they can slide up. */
function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.append(document.createTextNode(p)); return; }
          const w = document.createElement('span');
          w.className = 'w';
          const inner = document.createElement('span');
          inner.textContent = p;
          w.append(inner);
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && !(child as HTMLElement).classList.contains('w')) {
        walk(child);
      }
    });
  };
  walk(el);
  el.dataset.splitDone = '1';
}

export function initAnimations() {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitWords);
  if (reduce) return;

  // Headline word reveal
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const words = el.querySelectorAll('.w > span');
    const immediate = el.hasAttribute('data-split-now');
    gsap.to(words, {
      y: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.06,
      delay: immediate ? 0.15 : 0,
      scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%' },
    });
  });

  // Fade-up reveals, grouped so siblings stagger
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });

  // Parallax spice particles inside every illustration
  document.querySelectorAll<SVGElement>('.spice-art').forEach((svg) => {
    const host = svg.closest('[data-parallax-host]') ?? svg;
    svg.querySelectorAll<SVGGElement>('.sp:not(.sp-hero)').forEach((p) => {
      const d = parseFloat(p.dataset.depth ?? '1');
      gsap.fromTo(p, { y: 30 * d }, {
        y: -50 * d,
        rotation: (d - 1) * 12,
        transformOrigin: '50% 50%',
        ease: 'none',
        scrollTrigger: { trigger: host, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
  });

  // Generic parallax elements
  document.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
    const s = parseFloat(el.dataset.speed ?? '0.2');
    gsap.to(el, {
      yPercent: -100 * s,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Count-up numbers
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count ?? '0');
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
      onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
    });
  });

  // Magnetic buttons (desktop only)
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  // Card tilt on hover
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
      const media = el.querySelector<HTMLElement>('.card-media');
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotateY: px * 6, rotateX: -py * 6, duration: 0.6, ease: 'power3.out', transformPerspective: 900 });
        if (media) gsap.to(media, { x: px * 14, y: py * 14, scale: 1.06, duration: 0.6, ease: 'power3.out' });
      });
      el.addEventListener('pointerleave', () => {
        gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' });
        if (media) gsap.to(media, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' });
      });
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, reduce };
