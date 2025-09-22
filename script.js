const apikey = "49bd7bf57c3df1a2a3e2b2032b6f62db";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city) {
      const response = await fetch(apiUrl + city + `&appid=${apikey}`);

      if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
      } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "<sup>°C</sup>";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // Fix casing: should be data.weather, not data.Weather
        if (data.weather[0].main === "clouds") {
          weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "clear") {
          weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main === "rain") {
          weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "drizzle") {
          weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main === "mist") {
          weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
      }
    }

    searchBtn.addEventListener("click", () => {
      checkWeather(searchBox.value.trim());
    });