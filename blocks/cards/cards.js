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

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("Inside dom ready");
  // Create and insert a label
  const label = document.createElement("label");
  label.setAttribute("for", "country-select");
  label.textContent = "Select a country: ";
  document.body.appendChild(label);

  // Create the select dropdown
  const select = document.createElement("select");
  select.id = "country-select";

  // Add a default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Loading countries...";
  select.appendChild(defaultOption);

  // Add the select to the body
  document.body.appendChild(select);

  // Optional: Create an image element to display the selected flag
  const flagImg = document.createElement("img");
  flagImg.id = "flag";
  flagImg.style.marginTop = "10px";
  flagImg.style.height = "50px";
  flagImg.alt = "Country Flag";
  document.body.appendChild(flagImg);

  // Fetch countries from the API
  fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
    .then((res) => res.json())
    .then((data) => {
      // Clear loading option
      console.log("Country Data " + data);
      select.innerHTML = "";

      // Add default "select" option
      const placeholderOption = document.createElement("option");
      placeholderOption.value = "";
      placeholderOption.textContent = "Select a country";
      select.appendChild(placeholderOption);

      // Populate the dropdown
      data.data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name;
        option.textContent = country.name;
        option.setAttribute("data-flag", country.flag); // Store flag URL
        select.appendChild(option);
      });
    })
    .catch((err) => {
      console.error("Failed to fetch countries:", err);
      select.innerHTML = "";
      const errorOption = document.createElement("option");
      errorOption.value = "";
      errorOption.textContent = "Failed to load countries";
      select.appendChild(errorOption);
    });

  // Event listener to show selected country's flag
  select.addEventListener("change", () => {
    const selectedOption = select.options[select.selectedIndex];
    const flagUrl = selectedOption.getAttribute("data-flag");
    flagImg.src = flagUrl || "";
  });
});

  
}
