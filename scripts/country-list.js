import { loadJQuery } from './jquery-loader.js';

export async function getCountries(){

  const $ = await loadJQuery();

 $.ajax({
    url: '/etc/acs-commons/lists/countries-list/jcr:content.infinity.json', // Replace with your actual endpoint if different
    type: 'GET',
    success: function (response) {
      const list = response?.list;
      if (!list) {
        $(select).empty().append($('<option>', {
          value: '',
          text: 'No countries found'
        }));
        return;
      }

      // Clear loading option
      $(select).empty();

      // Add default placeholder
      $(select).append($('<option>', {
        value: '',
        text: 'Select a country'
      }));

      // Loop through each item
      Object.keys(list).forEach((key) => {
        const item = list[key];
        if (item && item['value'] && item['jcr:title']) {
          $(select).append($('<option>', {
            value: item['value'],
            text: item['jcr:title']
          }));
        }
      });
    },
    error: function () {
      console.error('Failed to load countries from AEM');
      $(select).empty().append($('<option>', {
        value: '',
        text: 'Error loading countries'
      }));
    }
  });
}
