(() => {
  const menu = document.querySelector('#navi-toggle');
  const nav = document.querySelector('.navigation__list');
  if (!menu || !nav) return;

  const closeMenu = () => {
    if (window.innerWidth <= 720) menu.checked = false;
  };

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) menu.checked = false;
  }, { passive: true });
})();
