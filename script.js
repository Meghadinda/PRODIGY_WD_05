const apiKey = "b37c89952f596e9a5c6c385a3a6a9ce2"; 

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name");

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const location = `${data.name}, ${data.sys.country}`;
      const temperature = `🌡️ ${data.main.temp}°C`;
      const condition = `🌥️ ${data.weather[0].description}`;
      const humidity = `💧 Humidity: ${data.main.humidity}%`;
      const wind = `💨 Wind Speed: ${data.wind.speed} m/s`;

      document.getElementById("location").textContent = location;
      document.getElementById("temperature").textContent = temperature;
      document.getElementById("condition").textContent = condition;
      document.getElementById("humidity").textContent = humidity;
      document.getElementById("wind").textContent = wind;

      updateBackground(data.weather[0].main.toLowerCase());
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
}

function updateBackground(condition) {
  let image = "default.jpg";

  if (condition.includes("cloud")) image = "clouds.jpg";
  else if (condition.includes("rain")) image = "rain.jpg";
  else if (condition.includes("clear")) image = "clear.jpg";
  else if (condition.includes("snow")) image = "snow.jpg";

  document.body.style.backgroundImage = `url('images/${image}')`;
}

