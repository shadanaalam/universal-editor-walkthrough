import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function loadJQuery(callback) {
  if (window.jQuery) {
    callback();
  } else {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.onload = () => callback();
    document.head.appendChild(script);
  }
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);

  loadJQuery(() => {
    console.log('jQuery loaded:', typeof $);
    $(block).addClass('jquery-enhanced');

    // Example: fade in all images
    $(block).find('img').hide().fadeIn(500);
  });

  $.ajax({
        url: "/etc/acs-commons/lists/report-parameter-components.infinity.json",
        type: "GET",
        success: function (data) {
            console.log("Data "+ data);
        },
        error: function () {
            console.warn("Could not fetch page properties at: " + pageEndpoint);
        }
    });

  
}
