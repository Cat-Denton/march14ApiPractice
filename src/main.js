import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fehrenheit is ${((response.main.temp-273)*9/5+32).toFixed(0)} degrees.`);
      $('.showForecast').text(`The current weather is ${response.weather[0].description}`)
      $('.showErrors').text("");
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
      $('.showHumidity').text("");
      $('.showTemp').text("");
    });
    // let request = new XMLHttpRequest();
    // const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

    // request.onreadystatechange = function() {
    //   if (this.readyState === 4 && this.status === 200) {
    //     const response = JSON.parse(this.responseText);
    //     getElements(response);
    //   }
    // };

    // request.open("GET", url, true);
    // request.send();

    // function getElements(response) {
    //   $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
    //   $('.showTemp').text(`The temperature in Fahrenheit is ${((response.main.temp-273)*9/5+32).toFixed(0)} degrees.`);
    //   $('.showForecast').text(`The current weather is ${response.weather[0].description}`)
    // }
  });
});


