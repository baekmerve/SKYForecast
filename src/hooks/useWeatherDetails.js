import {
  fetchAirQualityData,
  fetchCurrentWeather,
  fetchForecast,
  searchCity,
} from "@/api/weatherApis";
import { useQuery } from "@tanstack/react-query";

export const useWeatherQuery = (coordinates) => {
  return useQuery({
    queryKey: ["weather", coordinates], // Query key: depends on coordinates
    queryFn: () => fetchCurrentWeather(coordinates), // Query function: fetch weather data
    enabled: !!coordinates, // Only run query if coordinates exist
    onError: (error) => {
      console.error("useWeatherQuery error:", error.message);
    },
  });
};

export const useForecastQuery = (coordinates) => {
  return useQuery({
    queryKey: ["forecast", coordinates], // Query key: depends on coordinates
    queryFn: () => fetchForecast(coordinates), // Query function: fetch weather data
    enabled: !!coordinates, // Only run query if coordinates exist
    onError: (error) => {
      console.error("useForecastQuery error:", error.message);
    },
  });
};

export const useCitySearch = (city) => {
  return useQuery({
    queryKey: ["city", city], // Query key: depends on coordinates
    queryFn: () => searchCity(city),
    enabled: !!city, // Only run query if coordinates exist
    onError: (error) => {
      console.error("useCityQuery error:", error.message);
    },
  });
};

export const useAirQualityQuery = (coordinates) => {
  return useQuery({
    queryKey: ["airQuality", coordinates], // Query key: depends on coordinates
    queryFn: () => fetchAirQualityData(coordinates),
    enabled: !!coordinates, // Only run query if coordinates exist
    onError: (error) => {
      console.error("useAirQualityQuery error:", error.message);
    },
  });
};
