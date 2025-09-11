import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { loadJQuery } from '../../scripts/jquery-loader.js';

export default async function decorate(block) {

  const $ = await loadJQuery();

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


  // ----------------------
  // COUNTRY DROPDOWN START
  // ----------------------

  // Create container
  const container = document.createElement('div');
  container.style.marginTop = '20px';

  // Label
  const label = document.createElement("label");
  label.setAttribute("for", "country-select");
  label.textContent = "Select a country: ";
  container.appendChild(label);

  // Select
  const select = document.createElement("select");
  select.id = "country-select";
  const loadingOption = document.createElement("option");
  loadingOption.value = "";
  loadingOption.textContent = "Loading countries...";
  select.appendChild(loadingOption);
  container.appendChild(select);

  // Flag Image
  const flagImg = document.createElement("img");
  flagImg.id = "flag";
  flagImg.style.marginTop = "10px";
  flagImg.style.height = "50px";
  flagImg.alt = "Country Flag";
  container.appendChild(flagImg);

  // Append container to block
  block.appendChild(container);

  // AJAX call to fetch countries via jQuery
  $.ajax({
    url: "https://countriesnow.space/api/v0.1/countries/flag/images",
    type: "GET",
    success: function (response) {
      if (response && response.data) {
        // Clear existing options
        $(select).empty();

        // Add placeholder option
        $(select).append(
          $('<option>', {
            value: '',
            text: 'Select a country',
          })
        );

        // Populate countries
        response.data.forEach((country) => {
          $(select).append(
            $('<option>', {
              value: country.name,
              text: country.name,
              'data-flag': country.flag,
            })
          );
        });

        // Change event to show flag
        $(select).on('change', function () {
          const flagUrl = $(this).find('option:selected').data('flag');
          flagImg.src = flagUrl || '';
        });
      } else {
        $(select).empty().append(
          $('<option>', {
            value: '',
            text: 'Failed to load countries',
          })
        );
      }
    },
    error: function () {
      console.error("Failed to fetch country list via jQuery AJAX.");
      $(select).empty().append(
        $('<option>', {
          value: '',
          text: 'Error loading countries',
        })
      );
    },
  });

  // --------------------
  // COUNTRY DROPDOWN END


  
}
