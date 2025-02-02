const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

// The fetch function to get weather data
export const fetchCurrentWeather = async (coordinates) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  return response.json(); // Automatically returns data
};

export const fetchForecast = async (coordinates) => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&units=metric&lang=kr`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast  data");
  }
  return response.json(); // Automatically returns data
};

export const searchCity = async (city) => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch city weather data");
  }
  return response.json(); // Automatically returns data
};

export const fetchAirQualityData = async (coordinates) => {
  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}&lang=kr`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch city weather data");
  }
  return response.json(); // Automatically returns data
};
