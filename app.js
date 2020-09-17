// variables
let lon;
let lat;
let temperatureUnit = 'F';
let fahrenheitValue;

// query selectors
let temperatureDescription = document.querySelector(
  '[data-temperature-description]'
);
let temperatureDegree = document.querySelector('[data-temperature-degree]');
let locationTimezone = document.querySelector('[data-location-timezone]');
let IconContainer = document.querySelector('[data-icon]');
let temperatureContainer = document.querySelector('[data-degree-section]');
let unitDisplay = document.querySelector('[data-unit-type]');

window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2e44188ae7e877bf4fe23dac83d52bae`;

      fetch(api)
        .then((response) => response.json())
        .then((data) => {
          const { temp } = data.main;
          const { description } = data.weather[0];
          const { name } = data;
          const { icon } = data.weather[0];
          fahrenheitValue = (temp - 273.15) * 9/5 + 32;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          // set dom elements from api
          temperatureDegree.textContent = parseInt(fahrenheitValue);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = name;
          IconContainer.src = iconUrl;
        });
    });
  }
});



 //change to celcius or farenheit
 temperatureContainer.addEventListener('click', function (e) {
    if (temperatureUnit === 'F') {
      temperatureUnit = 'C';
      temperatureDegree.textContent = parseInt(((fahrenheitValue - 32) * 5) / 9);
    } else {
      temperatureUnit = 'F';
      temperatureDegree.textContent = parseInt(fahrenheitValue);
    }
    unitDisplay.textContent = temperatureUnit;
  });
