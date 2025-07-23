const localTimeEl = document.querySelector(".big-time");
const localDateEl = document.querySelector(".big-date");
const timezoneInfoEl = document.querySelector(".timezone-info");
const cityForm = document.querySelector(".search-form");
const citySelect = document.querySelector("#city-select");

// Main clock updater (always local time)
function updateLocalTime() {
  const now = new Date();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  localTimeEl.textContent = now.toLocaleTimeString("en-US", { timeZone });
  localDateEl.textContent = now.toLocaleDateString("en-US", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  timezoneInfoEl.textContent = timeZone;
}

// Static city cards - update every second
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

// City name → timezone map
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

// Init
window.addEventListener("DOMContentLoaded", () => {
  updateLocalTime();
  setInterval(updateLocalTime, 1000);
  initializeExistingCards();
});