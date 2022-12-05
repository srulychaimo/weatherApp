import "./getDate.js";

export const apiKey = "c3286e1b4dc761ece5eec6bcce666d7a";
const mainElem = document.getElementById("main");
const searchInput = document.getElementById("locationInput");
const formButton = document.getElementById("searchLocationBtn");

formButton.addEventListener("click", () =>
  currentWeatherCard(searchInput.value)
);

async function currentWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  const res = await fetch(url).then((res) => res.json());

  return res;
}

async function currentWeatherCard(cityName) {
  let data = "";
  if (typeof cityName === "string") {
    data = await currentWeather(cityName);
  } else {
    data = cityName;
  }

  const card = `
<div class="card col-sm-10 col-md-8 col-lg-6 bgc-light text-white">
<h5 class="card-header">${data.name} - ${data.weather[0].description}</h5>
<div class="card-body">
  <div class="row justify-content-between align-items-center">
    <div class="col-6">
      <h5 class="card-title fs-1">${Math.round(data.main.temp)} &#8451;</h5>
    </div>
    <div class="col-3">
      <img src="http://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png" alt="${data.weather[0].description}" />
      <p class="text-center">${data.weather[0].main}</p>
    </div>
  </div>
  <div class="row text-center border p-2 rounded">
    <div class="col-4">
    ${Math.round(data.main.feels_like)} &#8451; <br />
    Feels like 
    </div>
    <div class="col-4">
        ${data.main.humidity}% <br />
        Humidity
    </div>
    <div class="col-4">
    ${Math.round(data.wind.speed)} MPH  <br />
      Wind speed
    </div>
  </div>
</div>
</div>`;

  return (mainElem.innerHTML = card);
}

navigator.geolocation.getCurrentPosition(getWeatherByLocation, () => {});

export async function getWeatherByLocation(location) {
  const { coords } = location;

  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`;

  const res = await fetch(url).then((res) => res.json());

  currentWeatherCard(res);
}
