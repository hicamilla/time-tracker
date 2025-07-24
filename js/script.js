const citySelect = document.querySelector("#city-select");
const cardsContainer = document.querySelector(".cards-container");

const predefinedCities = [
  { name: "New York", zone: "America/New York" },
  { name: "London", zone: "Europe/London" },
  { name: "Tokyo", zone: "Asia/Tokyo" },
  { name: "Sydney", zone: "Australia/Sydney" },
  { name: "São Paulo", zone: "America/São Paulo" },
  { name: "Madrid", zone: "Europe/Madrid" },
];

let currentInterval;

// ⬅️ Setup Back Button
const backButton = document.createElement("button");
backButton.textContent = "Back to World Clock";
backButton.classList.add("back-button");
backButton.style.margin = "0 0 20px 20px";
backButton.style.padding = "10px 16px";
backButton.style.fontFamily = "Gambetta";
backButton.style.fontSize = "15px";
backButton.style.fontWeight = "700";
backButton.style.textTransform = "uppercase";
backButton.style.cursor = "pointer";
backButton.style.display = "none";
document.querySelector(".cards-selection").appendChild(backButton);

// ⏱ Render city card
function renderCityCard(cityName, timezone) {
  const now = moment().tz(timezone);
  return `
    <div class="city-card">
      <h3 class="city-name">${cityName}</h3>
      <p class="country-name">${timezone}</p></p>
      <p class="card-time">${now.format("h:mm:ss A")}</p>
      <p class="card-date">${now.format("ddd, MMMM D, YYYY")}
    </div>
  `;
}

// 🔄 Update current card time
function updateTime(timezone) {
  const now = moment().tz(timezone);
  const timeEl = document.querySelector(".card-time");
  const dateEl = document.querySelector(".card-date");

  if (timeEl) timeEl.textContent = now.format("h:mm:ss A");
  if (dateEl) dateEl.textContent = now.format("ddd, MMMM D, YYYY");
}

// ✅ Show one selected city
function showSelectedCity(cityName, timezone) {
  clearInterval(currentInterval);
  cardsContainer.innerHTML = renderCityCard(cityName, timezone);
  currentInterval = setInterval(() => updateTime(timezone), 1000);
  backButton.style.display = "inline-block";
}

// 🌍 Show all cities
function showAllCities() {
  clearInterval(currentInterval);
  cardsContainer.innerHTML = "";

  predefinedCities.forEach((city) => {
    cardsContainer.innerHTML += renderCityCard(city.name, city.zone);
  });

  currentInterval = setInterval(() => {
    const cards = document.querySelectorAll(".city-card");
    cards.forEach((card) => {
      const name = card.querySelector(".city-name").textContent.trim();
      const timezone = predefinedCities.find((c) => c.name === name)?.zone;
      if (timezone) {
        const now = moment().tz(timezone);
        card.querySelector(".card-time").textContent = now.format("h:mm:ss A");
        card.querySelector(".card-date").textContent = now.format("ddd, MMMM D, YYYY");
      }
    });
  }, 1000);

  backButton.style.display = "none";
}

// 🕐 Show local time (only when all cities visible)
function updateLocalTime() {
  const localZone = moment.tz.guess();
  const now = moment().tz(localZone);
  document.getElementById("local-timezone").textContent = localZone;
  document.getElementById("local-time").textContent = now.format("h:mm:ss A");
  document.getElementById("local-date").textContent = now.format("ddd,  MMMM D, YYYY");
}

// 📤 Dropdown change
citySelect.addEventListener("change", (event) => {
  const timezone = event.target.value;
  const cityName = event.target.options[event.target.selectedIndex].text;
  showSelectedCity(cityName, timezone);
});

// 🔙 Back button click
backButton.addEventListener("click", showAllCities);

// 🚀 Init on page load
window.addEventListener("DOMContentLoaded", () => {
  updateLocalTime();
  setInterval(updateLocalTime, 1000);
  showAllCities();
});