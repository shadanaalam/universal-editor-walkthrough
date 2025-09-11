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

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { loadJQuery } from '../../scripts/jquery-loader.js';

export default async function decorate(block) {
  const $ = await loadJQuery();

  // Create UL list from block content
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

  // Example AJAX request
  $.ajax({
    url: "/content/ttnretail/us/en/sign-in.infinity.json",
    type: "GET",
    success: function (data) {
      console.log("Data: ", data);
    },
    error: function () {
      console.warn("Could not fetch page properties");
    }
  });

  // ----------------------
  // COUNTRY DROPDOWN START
  // ----------------------

  // Container for the dropdown and flag
  const container = document.createElement('div');
  container.style.marginTop = '20px';

  // Create and insert a label
  const label = document.createElement("label");
  label.setAttribute("for", "country-select");
  label.textContent = "Select a country: ";
  container.appendChild(label);

  // Create the select dropdown
  const select = document.createElement("select");
  select.id = "country-select";

  // Add a default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Loading countries...";
  select.appendChild(defaultOption);
  container.appendChild(select);

  // Image for the flag
  const flagImg = document.createElement("img");
  flagImg.id = "flag";
  flagImg.style.marginTop = "10px";
  flagImg.style.height = "50px";
  flagImg.alt = "Country Flag";
  container.appendChild(flagImg);

  // Append the whole container to the block
  block.appendChild(container);

  // Fetch countries from the API
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
    const json = await res.json();

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

    // Handle change to show flag
    select.addEventListener("change", () => {
      const selectedOption = select.options[select.selectedIndex];
      const flagUrl = selectedOption.getAttribute("data-flag");
      flagImg.src = flagUrl || "";
    });

  } catch (err) {
    console.error("Failed to fetch countries:", err);
    select.innerHTML = "";
    const errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Failed to load countries";
    select.appendChild(errorOption);
  }

  // --------------------
  // COUNTRY DROPDOWN END
  // --------------------

  
}
