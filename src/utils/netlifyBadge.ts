// Netlify injects a floating "Powered by Netlify" badge at the bottom of the page.
// On mobile it sits on top of the bottom navigation and hides the tabs, so we
// detect it and lift it above the navigation bar.

const BADGE_CLASS = 'netlify-badge-offset';

const looksLikeNetlifyBadge = (el: Element): boolean => {
  if (el.id === 'root' || el.id === 'app-splash') return false;
  if (['SCRIPT', 'STYLE', 'LINK', 'NOSCRIPT'].includes(el.tagName)) return false;

  const style = window.getComputedStyle(el);
  if (style.position !== 'fixed') return false;

  const markup = `${el.id} ${el.className} ${el.outerHTML.slice(0, 2000)} ${
    el.shadowRoot?.innerHTML.slice(0, 2000) ?? ''
  }`.toLowerCase();
  return markup.includes('netlify');
};

const offsetBadges = () => {
  Array.from(document.body.children).forEach((el) => {
    if (!el.classList.contains(BADGE_CLASS) && looksLikeNetlifyBadge(el)) {
      el.classList.add(BADGE_CLASS);
    }
  });
};

export const keepNetlifyBadgeClearOfNav = () => {
  offsetBadges();
  const observer = new MutationObserver(offsetBadges);
  observer.observe(document.body, { childList: true });
};
