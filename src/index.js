function formatDate() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  const currentTime = `${dayOfWeek} ${hours}:${minutes}`;

  document.getElementById("current-time").textContent = currentTime;
}

formatDate();

let unit=document.querySelector("#submit-form");

function displaySearch(event){
  event.preventDefault();
  let city = document.querySelector("#city-input");
  //city.innerHTML = response.data.name;

  let newCity = `${city.value}`;
  //let newCity = `${city}`;

  document.getElementById("nameCity").textContent = newCity;
  //city.innerHTML=newCity;
  console.log(newCity);

  let apiKey = "8d9838178b5b401f1b4e7cb5af18e210";
  let city2 = newCity;
  //city=city.toLowerCase;
  function getWeather(response) {
    event.preventDefault();
    console.log(response.data);
    //console.log(response.data.main.temp);
    // change temperature by city
    let temp = Math.round(response.data.main.temp);
    let newWeather = document.querySelector(".temp");
    newWeather.innerHTML = `${temp}`;
    // change description by city
    let descrip= response.data.weather[0].description;
    let state= document.querySelector("#weather-state");
    state.innerHTML=`${descrip}`;
    // change humidity by city
    let humid=document.querySelector("#hum");
    let humValue=response.data.main.humidity;
    humid.innerHTML=`Humidity: ${humValue}%`;
    // change wind speed by city
    let wind=document.querySelector("#win");
    let windValue=Math.round(response.data.wind.speed);
    wind.innerHTML=`Wind: ${windValue} km/h`;
    // change visibility
    let visibility=document.querySelector("#vis");
    let visiValue=Math.round(response.data.main.feels_like);
    visibility.innerHTML = `Feels like ${visiValue}°C`;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city2}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getWeather);


}

unit.addEventListener("submit", displaySearch);
let search = document.querySelector("#search");
search.addEventListener("click", displaySearch);


function displayLocation(){
  function getTemp(response) {

    let geoCity=response.data.name;
    console.log(response.data);
    let city=document.querySelector("#nameCity");
    city.innerHTML=`${geoCity}`
    let temp = document.querySelector(".temp");
    let temperature = Math.round(response.data.main.temp);
    temp.innerHTML = `${temperature} `;
    //temp.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
    let descrip = response.data.weather[0].description;
    let state = document.querySelector("#weather-state");
    state.innerHTML = `${descrip}`;
    // change humidity by city
    let humid = document.querySelector("#hum");
    let humValue = response.data.main.humidity;
    humid.innerHTML = `Humidity: ${humValue}%`;
    // change wind speed by city
    let wind = document.querySelector("#win");
    let windValue = Math.round(response.data.wind.speed);
    wind.innerHTML = `Wind: ${windValue} km/h`;
    // change visibility
    let visibility = document.querySelector("#vis");
    let visiValue = Math.round(response.data.main.feels_like);
    visibility.innerHTML = `Feels like ${visiValue}°C`;
  }
  function getPosition(position) {
    let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(getTemp);
  }
  navigator.geolocation.getCurrentPosition(getPosition);

}

let current=document.querySelector("#current");
current.addEventListener("click",displayLocation)






