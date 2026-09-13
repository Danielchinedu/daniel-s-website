(() => {
  const scene = document.querySelector('.home_content');
  const portrait = document.querySelector('.home-img');
  if (!scene || !portrait) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || window.innerWidth <= 800) return;

  let frame = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    scene.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
    portrait.style.transform = `translate3d(${currentX * -2}px, ${currentY * 2}px, 0)`;
    frame = requestAnimationFrame(render);
  };

  window.addEventListener('pointermove', (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    targetX = x * 5;
    targetY = y * -4;
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    targetX = 0;
    targetY = 0;
  });

  render();
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame), { once: true });
})();
