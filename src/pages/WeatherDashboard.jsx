/* eslint-disable no-unused-vars */
import CitySearch from "@/components/CitySearch";
import { TodaysWeather } from "@/components/TodaysWeather";
import TempGraph from "@/components/TempGraph";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import WeatherDetails from "@/components/WeatherDetails";
import FiveDayWeather from "@/components/FiveDayWeather";
import {
  useAirQualityQuery,
  useForecastQuery,
  useWeatherQuery,
} from "@/hooks/useWeatherDetails";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react";
import React, { useState } from "react";

const WeatherDashboard = () => {
  const [searchedCity, setSearchedCity] = useState(null);

  const { coordinates, error, getCurrentLocation, isLoading } =
    useCurrentLocation();

  // If there's a searchedCity, use that; otherwise, use the coordinates from geolocation
  const weatherQuery = useWeatherQuery(searchedCity || coordinates);
  const forecastQuery = useForecastQuery(searchedCity || coordinates);
  const airQualityQuery = useAirQualityQuery(searchedCity || coordinates);

  const handleCitySelect = (cityCoordinates) => {
    setSearchedCity(cityCoordinates); // Set the coordinates from city search
  };

  const handleUseMyLocation = () => {
    setSearchedCity(null); // Clear selected city
    getCurrentLocation();
  };

  const handleRefresh = () => {
    getCurrentLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      airQualityQuery.refetch();
    }
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  //! when the location is not enabled
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button
            onClick={getCurrentLocation}
            variant={"outline"}
            className="w-fit"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  //! when the coordinates is not present
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather</p>
          <Button
            onClick={getCurrentLocation}
            variant={"outline"}
            className="w-fit"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  //! if there is api call error
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCw className="mr-2 h-4 w-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  //? Show loading animation while waiting for data
  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingAnimation />;
  }

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center justify-between"> */}
      <div className="flex grid-cols-2 gap-10  justify-between">
        {/* search */}
        <CitySearch onSelectCity={handleCitySelect} />
        <Button
          onClick={handleUseMyLocation}
          variant={"outline"}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <MapPin className="mr-2 h-4 w-4 0" />내 위치 사용
        </Button>
      </div>
      <div className="grid  gap-6">
        <div className="grid grid-cols md:grid-cols-[40%_1fr] gap-6">
          {/* current weather & WeatherDetails */}
          <TodaysWeather data={weatherQuery.data} />
          <TempGraph data={forecastQuery.data} />

          {/* hourly temp */}
        </div>
        <div className="grid grid-cols md:grid-cols-[40%_1fr] gap-4">
          <FiveDayWeather data={forecastQuery.data} />
          <WeatherDetails
            weatherData={weatherQuery.data}
            airQualityData={airQualityQuery.data}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
