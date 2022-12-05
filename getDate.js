const dateDisplay = document.querySelector(".date-display");

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function getDate() {
  const date = new Date();
  const htmlDate = `${
    days[date.getDay()]
  } - ${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

  dateDisplay.innerHTML = htmlDate;
}

getDate();

setInterval(() => {
  getDate();
}, 1000);
