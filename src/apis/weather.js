import { API_CONFIG } from "./config";

class WeatherAPI {
  createUrl(endpoint, params) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }
  //function for fetchData //
  async fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }
    return response.json();
  }

  //function for getCurrentWeather //

  async getCurrentWeather({ lat, lon }) {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    return this.fetchData(url);
  }

  //function for getForecast //
  async getForecast({ lat, lon }) {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    return this.fetchData(url);
  }

  //function for reverseGeocode //
  async reverseGeocode({ lat, lon }) {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });
    return this.fetchData(url);
  }
  //function for searchLocations //
  async searchLocations(query) {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData(url);
  }
}

export const weatherAPI = new WeatherAPI();
