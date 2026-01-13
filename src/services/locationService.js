export async function getFormattedLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weather = await fetchWeather(latitude, longitude);
          resolve(weather);
        } catch (error) {
          console.error("Error fetching weather:", error);
          resolve({ text: "Unknown Location", temperature: null, condition: null });
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        reject(error);
      }
    );
  });
}

async function fetchWeather(lat, lon) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`
    );
    const data = await response.json();
    
    // Simple reverse geocoding is hard without key, so we'll skip city name or use coordinates generic.
    // Or we can use a free reverse geocoding API like bigdatacloud if wanted, but keep it simple first.
    // Let's just return condition and temp.
    
    const temp = Math.round(data.current.temperature_2m);
    const code = data.current.weather_code;
    const condition = getWeatherCondition(code);
    
    return {
      text: `${condition}, ${temp}°C`,
      latitude: lat,
      longitude: lon,
      fullInfo: `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}, ${condition}, ${temp}°C`
    };
  } catch (err) {
    throw err;
  }
}

function getWeatherCondition(code) {
  // WMO Weather interpretation codes (WW)
  if (code === 0) return "Clear sky";
  if (code >= 1 && code <= 3) return "Partly cloudy";
  if (code >= 45 && code <= 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rainy";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}
