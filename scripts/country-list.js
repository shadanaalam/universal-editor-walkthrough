import { loadJQuery } from './jquery-loader.js';

export async function getCountries() {
  const $ = await loadJQuery();

  // Create the select dropdown dynamically
  const select = $('<select>').attr('id', 'country-select');

  // Create and append the loading option
  select.append($('<option>', {
    value: '',
    text: 'Loading countries...'
  }));

  // Append the select dropdown to the body or any other container you want
  $('body').append(select); // You can change 'body' to any other container as needed

  // Fetch countries via AJAX
  $.ajax({
  url: '/etc/acs-commons/lists/countries-list/jcr:content.infinity.json', // Your endpoint
  type: 'GET',
  beforeSend: function (xhr) {
    // Set the Basic Auth header
    const username = 'shadan.aalam@tothenew.com'; // Replace with your actual username
    const password = 'Alamttn@123'; // Replace with your actual password
    const base64Auth = btoa(username + ':' + password); // Encode to Base64
    xhr.setRequestHeader('Authorization', 'Basic ' + base64Auth);
  },
    success: function (response) {
      const list = response?.list;
      if (!list) {
        select.empty().append($('<option>', {
          value: '',
          text: 'No countries found'
        }));
        return;
      }

      // Clear loading option
      select.empty();

      // Add default placeholder option
      select.append($('<option>', {
        value: '',
        text: 'Select a country'
      }));

      // Loop through each item and create option elements
      Object.keys(list).forEach((key) => {
        const item = list[key];
        if (item && item['value'] && item['jcr:title']) {
          select.append($('<option>', {
            value: item['value'],
            text: item['jcr:title']
          }));
        }
      });
    },
    error: function () {
      console.error('Failed to load countries from AEM');
      select.empty().append($('<option>', {
        value: '',
        text: 'Error loading countries'
      }));
    }
  });
}
