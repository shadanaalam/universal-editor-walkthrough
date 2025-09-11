import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { loadJQuery } from '../../scripts/jquery-loader.js';

export default async function decorate(block) {

   const $ = await loadJQuery();
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


  $.ajax({
        url: "/content/ttnretail/us/en/sign-in.infinity.json",
        type: "GET",
        success: function (data) {
            console.log("Data "+ data);
        },
        error: function () {
            console.warn("Could not fetch page properties at: " + pageEndpoint);
        }
    });


  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
    const json = await res.json();
    console.log("Countries "+ json);

    select.innerHTML = ''; // Clear loading text

    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Select a country";
    select.appendChild(placeholderOption);

    json.data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name;
      option.textContent = country.name;
      option.setAttribute("data-flag", country.flag); // Store flag URL
      select.appendChild(option);
    });

    

  } catch (err) {
    console.error("Failed to fetch countries:", err);
    select.innerHTML = "";
    const errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Failed to load countries";
    select.appendChild(errorOption);
  }
------------------

  
}
