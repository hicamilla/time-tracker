const localTimeEl = document.querySelector(".big-time");
const localDateEl = document.querySelector(".big-date");
const timezoneInfoEl = document.querySelector(".timezone-info");
const cityForm = document.querySelector(".search-form");
const citySelect = document.querySelector("#city-select");
const localTimeContainer = document.querySelector(".local-time-selection");

function updateLocalTime() {
  const now = new Date();
  localTimeEl.textContent = now.toLocaleTimeString();
  localDateEl.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  timezoneInfoEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function showSelectedCity(timezone) {
  const cityName = timezone.split("/")[1].replace(/_/g, " ");
  const countryName = timezone.split("/")[0].replace(/_/g, " ");

  function updateSelectedCity() {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { timeZone: timezone });
    const date = now.toLocaleDateString("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    localTimeContainer.innerHTML = `
      <p class="city-name">${cityName}</p>
      <p class="country-name">${countryName}</p>
      <p class="card-time">${time}</p>
      <p class="card-date">${date}</p>
    `;
  }

  updateSelectedCity();
  setInterval(updateSelectedCity, 1000);
}

function guessTimeZoneFromCity(cityName) {
  const map = {
    "New York": "America/New_York",
    "London": "Europe/London",
    "Tokyo": "Asia/Tokyo",
    "Paris": "Europe/Paris",
    "Sydney": "Australia/Sydney"
  };
  return map[cityName] || Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function initializeExistingCards() {
  const cards = document.querySelectorAll(".cards-selection .city-card");

  cards.forEach(card => {
    const cityName = card.querySelector(".city-name")?.textContent.trim();
    const timezone = guessTimeZoneFromCity(cityName);

    function updateCardTime() {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", { timeZone: timezone });
      const date = now.toLocaleDateString("en-US", {
        timeZone: timezone,
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      card.querySelector(".card-time").textContent = time;
      card.querySelector(".card-date").textContent = date;
    }

    updateCardTime();
    setInterval(updateCardTime, 1000);
  });
}

cityForm.addEventListener("change", () => {
  const timezone = citySelect.value;
  if (!timezone) return;
  showSelectedCity(timezone);
});

window.addEventListener("DOMContentLoaded", () => {
  updateLocalTime();
  setInterval(updateLocalTime, 1000);
  initializeExistingCards();
});