
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
 }

let form= document.querySelector('form');
form.addEventListener("submit", search);


function change (event) {
  event.preventDefault(); 
  document.getElementById('temperature').innerHTML = `19°C`;
}


let celsius = document.getElementById('celsiusLink'); 
celsius.addEventListener("click", change);


function  temparatureChange (event) {
  event.preventDefault();
  document.getElementById('temperature').innerHTML = `66°F`;
}
let fahrenheit = document.getElementById('fahrenheitLink'); 
fahrenheit.addEventListener("click", temparatureChange)