export const apiKey = "c3286e1b4dc761ece5eec6bcce666d7a";
const mainElem = document.getElementById("main");
import { days } from "./getDate.js";
const searchInput = document.getElementById("locationInput");
const formButton = document.getElementById("searchLocationBtn");

formButton.addEventListener("click", handleSearch);

function handleSearch() {
  const result = fiveDaysWeather(searchInput.value);

  result.then((res) => {
    mainElem.innerHTML = "";
    mainElem.innerHTML += `<h4 class="text-white text-center mt-5">${res.city.name}</h4>`;
    res.list.map((obj) => {
      let date = new Date(obj.dt * 1000);

      checkForDate(date, obj);
    });
  });
}

async function fiveDaysWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  const res = await fetch(url).then((res) => res.json());

  return res;
}

const addToHtml = (type, date, obj) => {
  if (type === "row") {
    return (mainElem.innerHTML += `
<div
class="container bgc-light text-white row justify-content-center align-items-center p-5 border m-5 ${date.toLocaleDateString()}"
>
<div class="col-md-12 col-lg-2 fw-bold text-center mb-2">${
      days[date.getDay()]
    }: ${date.toLocaleDateString()}</div>
</div>`);
  }
  if (type === "col") {
    const rowElem = document.getElementsByClassName(
      `${date.toLocaleDateString()}`
    );
    rowElem[0].innerHTML += `
    <div
  class="col-6 col-sm-3 col-md col d-flex flex-column justify-content-center align-items-center border p-3 mw-25"
>
  <p>${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
  <img
    src="http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png"
    alt="${obj.weather[0].description}"
    class="img-fluid w-50"
  />
  <p>${Math.round(obj.main.temp)} &#8451;</p>
  <p>Feels like: ${Math.round(obj.main.feels_like)} &#8451;</p>
</div>
    `;
  }
};

let checkDate = "";

function checkForDate(date, obj) {
  if (date.toLocaleDateString() !== checkDate) {
    checkDate = date.toLocaleDateString();
    return addToHtml("row", date, obj);
  }
  return addToHtml("col", date, obj);
}

navigator.geolocation.getCurrentPosition(getWeatherByLocation, () => {});

export async function getWeatherByLocation(location) {
  const { coords } = location;

  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`;

  const res = await fetch(url).then((res) => res.json());

  mainElem.innerHTML = "";
  mainElem.innerHTML += `<h4 class="text-white text-center mt-5">${res.city.name}</h4>`;
  res.list.map((obj) => {
    let date = new Date(obj.dt * 1000);

    checkForDate(date, obj);
  });
}
