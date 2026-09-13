(() => {
  const scene = document.querySelector('.home_content');
  const portrait = document.querySelector('.home-img');
  if (!scene || !portrait) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktop = window.matchMedia('(min-width: 901px)');
  if (reduceMotion || !desktop.matches) return;

  let frame = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let active = true;

  const render = () => {
    if (!active) return;
    currentX += (targetX - currentX) * 0.075;
    currentY += (targetY - currentY) * 0.075;
    scene.style.transform = `translateZ(50px) rotateX(${currentY}deg) rotateY(${currentX}deg)`;
    portrait.style.transform = `translate3d(${currentX * -2.2}px, ${currentY * 2.2}px, 0)`;
    frame = requestAnimationFrame(render);
  };

  const reset = () => {
    targetX = 0;
    targetY = 0;
  };

  window.addEventListener('pointermove', (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    targetX = x * 4.5;
    targetY = y * -3.5;
  }, { passive: true });

  window.addEventListener('pointerleave', reset, { passive: true });
  window.addEventListener('blur', reset, { passive: true });

  render();

  window.addEventListener('pagehide', () => {
    active = false;
    if (frame) cancelAnimationFrame(frame);
  }, { once: true });
})();
