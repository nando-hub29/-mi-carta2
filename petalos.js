// Pétalos cayendo (canvas). Se pausan con la pestaña oculta y se desactivan con prefers-reduced-motion.
const cv = document.getElementById("petalos"), x = cv.getContext("2d");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let W, H, P = [], on = false, raf;
const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
addEventListener("resize", size); size();
const nuevo = (top) => ({ x: Math.random() * W, y: top ? -20 : Math.random() * H, r: 6 + Math.random() * 8, vy: .5 + Math.random() * 1.1, vx: Math.random() * .8 - .4,
  a: Math.random() * 6.28, va: (Math.random() - .5) * .04, s: Math.random() * 6.28, c: ["#ffb7c5", "#ff8fab", "#ffd6e0", "#f48fb1"][Math.random() * 4 | 0], tmp: false });
function frame() {
  if (!on) return;
  if (!document.hidden) {
    x.clearRect(0, 0, W, H);
    for (const p of P) { p.y += p.vy; p.s += .02; p.x += p.vx + Math.sin(p.s) * .6; p.a += p.va;
      if (p.y > H + 20) { if (p.tmp) p.dead = true; else { p.y = -20; p.x = Math.random() * W; } }
      x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.globalAlpha = .85; x.beginPath(); x.ellipse(0, 0, p.r, p.r * .55, 0, 0, 6.28); x.fill(); x.restore(); }
    P = P.filter((p) => !p.dead);
  }
  raf = requestAnimationFrame(frame);
}
export function iniciar() { if (reduce || on) return; on = true; P = Array.from({ length: Math.min(40, W / 25) }, () => nuevo(false)); frame(); }
export function lluvia() { if (reduce) return; for (let i = 0; i < 60; i++) { const p = nuevo(true); p.tmp = true; P.push(p); } if (!on) { on = true; frame(); } }
