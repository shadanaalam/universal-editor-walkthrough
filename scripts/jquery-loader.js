// scripts/jquery-loader.js

export async function loadJQuery() {
  if (window.jQuery) return window.jQuery;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.onload = () => resolve(window.jQuery);
    document.head.appendChild(script);
  });
}
