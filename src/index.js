
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

 function search (event) {
   event.preventDefault();
   let searchInput = document.getElementById('inputPassword6');
   document.getElementById('city').innerHTML = `${searchInput.value}`;
   return searchInput.value; 
 }

let form= document.querySelector('form');
form.addEventListener("submit", search);


function newSearch (event) {
  event.preventDefault();
  let input = document.getElementById('inputPassword6')
  let city = input.value;

let apiKey = "231854760189f7f05bf66b319c23555e";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
axios.get(apiUrl).then(getTemperature);

function getTemperature (response) {
  let locationTemperature = response.data.main.temp;
  document.getElementById('temperature').innerHTML = Math.round(locationTemperature);
  let humidity = document.getElementById("humidity").innerHTML = response.data.main.humidity;
  let windSpeed = document.getElementById("wind").innerHTML =Math.round(1.852 * response.data.wind.speed);
  let weatherDescription = document.getElementById("weatherDescription").innerHTML= response.data.weather[0].description;
}

}

let test = document.querySelector('form');
form.addEventListener("submit", newSearch);


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

function forcastTemp (event){
  event.preventDefault();
  let input = document.getElementById('inputPassword6')
  let city = input.value;

let apiKey = "231854760189f7f05bf66b319c23555e";
let apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt={3}&appid=${apiKey}&&units=metric`;
axios.get(apiUrl).then(getForcast);

function getForcast (response){
console.log(response);
}


}

let forcast = document.querySelector('forcast');
form.addEventListener("submit", forcastTemp);
/* function change (event) {
  event.preventDefault(); 
  document.getElementById('temperature').innerHTML = `19`;
 */

/*  function changeUnits (event) {
  event.preventDefault();
  let input = document.getElementById('inputPassword6')
  let city = input.value;
  let changeLink = document.getElementById('unitLink');
  let temperature = document.getElementById('temperature');
  let unit = document.getElementById('preciseUnit');
  


    function updateUnits (response) {
      let newTemp= response.data.main.temp;


      if (changeLink === "farenheit") {
        changeLink.innerHTML = "celsius"
        temperature.innerHTML= Math.round(newTemp)*1.8+32;
        unit.innerHTML = "°F"
      
      } else {
        unit.innerHTML = "celsius";
        temperature.innerHTML = Math.round(newTemp);
        unit.innerHTML = "°C";
      }
      
      
    }     
     
    let apiKey = "231854760189f7f05bf66b319c23555e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
    axios.get(apiUrl).then(updateUnits);
}


let switchUnits =document.getElementById('unitLink');
switchUnits.addEventListener("click", changeUnits); */