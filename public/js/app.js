console.log('Client side file is loaded');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const pLocation = document.getElementById('location');
const pForecast = document.getElementById('forecast');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const location = searchElement.value;
    pLocation.textContent = 'Loading...';
    pForecast.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          pLocation.textContent = data.error;
        } else {
          pLocation.textContent = data.location;
          pForecast.textContent = data.forecast;
        }
      });
    });
});