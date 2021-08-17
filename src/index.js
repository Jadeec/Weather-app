// Date, time function 
let now = new Date();

let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let days = week[now.getDay()];

 document.getElementById('day').innerHTML = `${days}`; 

 let time = now.getHours();

 if (time < 10) {
  document.getElementById('hour').innerHTML = `0${time}`;
} else {
 document.getElementById('hour').innerHTML = `${time}`; 
}

 let minute = now.getMinutes(); 

 if (minute < 10) {
  document.getElementById('minutes').innerHTML = `0${minute}`;
 } else {
  document.getElementById('minutes').innerHTML = `${minute}`;
 }


// Handle the city input 
 function search (event) {
   event.preventDefault();
   let searchInput = document.getElementById('inputPassword6');
   document.getElementById('city').innerHTML = `${searchInput.value}`;
   return searchInput.value; 
 }

let form= document.querySelector('form');
form.addEventListener("submit", search);

// Display temperature 
function newSearch (event) {
  event.preventDefault();
  let input = document.getElementById('inputPassword6')
  let city = input.value;

let apiKey = "231854760189f7f05bf66b319c23555e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
axios.get(apiUrl).then(getTemperature);

function getTemperature (response) {
  let locationTemperature = response.data.main.temp;
  celsiusTemp = Math.round(locationTemperature);
  document.getElementById('temperature').innerHTML = celsiusTemp;
  let humidity = document.getElementById("humidity").innerHTML = response.data.main.humidity;
  let windSpeed = document.getElementById("wind").innerHTML =Math.round(1.852 * response.data.wind.speed);
  let weatherDescription = document.getElementById("weatherDescription").innerHTML= response.data.weather[0].description;

  // change the weather icon 
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute( "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}

}

let test = document.querySelector('form');
form.addEventListener("submit", newSearch);

// Find temperature via location 
function findLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(usePosition);

  function usePosition (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let temp = document.getElementById('temperature');
    
    let apiKey = "231854760189f7f05bf66b319c23555e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&&units=metric`
    axios.get(apiUrl).then(showNewTemperature);

    function showNewTemperature (response) {
      let newTemp = response .data.main.temp;
      temp.innerHTML = Math.round(newTemp);
      
      let newCity = document.getElementById("city").innerHTML = response.data.name;
      let humidity = document.getElementById("humidity").innerHTML = response.data.main.humidity;
      let windSpeed = document.getElementById("wind").innerHTML =Math.round(1.852 * response.data.wind.speed);
      let weatherDescription = document.getElementById("weatherDescription").innerHTML= response.data.weather[0].description;
    
    }
 
  }

  
}  

let locationButton = document.getElementById("locationButton");
locationButton.addEventListener("click", findLocation); 

// 4 day forecast 
function getForecastDate (timeStamp){
let date = new Date(timeStamp*1000);
let day = date.getDay();
let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
return days[day];
};

function displayForecast (response) {
  let forecastData = (response.data.daily);

  let forecastElement = document.querySelector(".forecast");


  let forecastHTML = `<div class="row">`;

  forecastData.forEach(function (forecastDay, index) {
    console.log(forecastDay);

    if (index < 4) {
      forecastHTML = forecastHTML + 
      `
      <div class="col-3">
        <div class="forecast-day"> ${getForecastDate(forecastDay.dt)}</div>
        <img 
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt="ForecastPicture" 
        width="36px"> 
        <br>
        <div class= weather-forecast-temperature> 
          <span class="forecast-temperature-min"> ${Math.round( forecastDay.temp.min)}°</span>  
          <span class="forecast-temperature-max">  ${Math.round(forecastDay.temp.max)}°</span>
        </div>
    </div>`;

    }
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML; 

};

function getForecast (coordonates) {
  apiKey = "231854760189f7f05bf66b319c23555e";
  apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordonates.lat}&lon=${coordonates.lon}&appid=${apiKey}&&units=metric`
  axios.get(apiUrl).then(displayForecast); 
}

// Convert units 
 function fahrenheitUnit (event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9/5) + 32;
  let temperature = document.getElementById('temperature');
  temperature.innerHTML= Math.round(fahrenheitTemp);
  fahrenheitChange.classList.add("active");
  celsiusChange.classList.remove("active"); 
  }

function celsiusUnit (event) {
  event.preventDefault();
  let temperature = document.getElementById('temperature');
  temperature.innerHTML= celsiusTemp;
  celsiusChange.classList.add('active');
  fahrenheitChange.classList.remove('active'); 
  
}

let celsiusTemp = null;

let fahrenheitChange = document.getElementById('FahrenheitLink');
fahrenheitChange.addEventListener("click", fahrenheitUnit);

let celsiusChange = document.getElementById('celsiusLink');
celsiusChange.addEventListener("click", celsiusUnit);
