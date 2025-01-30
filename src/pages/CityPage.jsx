/* eslint-disable no-unused-vars */
import { CurrentWeather } from "@/components/CurrentWeather";
import HourlyTemp from "@/components/HourlyTemp";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertTriangle } from "lucide-react";
import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Failed to fetch weather data. Please try again
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="space-y-4">
      {/* city name */}
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>
      </div>
      <div className="grid gap-6 ">
        {/* current weather & WeatherDetails */}
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <CurrentWeather data={weatherQuery.data} />
          <WeatherDetails data={weatherQuery.data} />
        </div>
        {/* hourly temp */}
        <HourlyTemp data={forecastQuery.data} />
        {/* forecast*/}
        <WeatherForecast data={forecastQuery.data} />
      </div>
    </div>
  );
};

export default CityPage;
