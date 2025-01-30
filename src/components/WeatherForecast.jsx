/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format } from "date-fns";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

const WeatherForecast = ({ data }) => {
  const dailyForecats = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {});

  //returs weather object to an array
  const nextDays = Object.values(dailyForecats).slice(0, 6); // 5 days

  const formatTemp = (temp) => `${Math.round(temp)}°C`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 ">
          {nextDays.map((day) => {
            return (
              <div
                key={day.date}
                className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4  "
              >
                <div>
                  {/* day, month, date */}
                  <p className="font-medium">
                    {" "}
                    {format(new Date(day.date * 1000), "EEE, MMM, d")}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {day.weather.description}
                  </p>
                </div>
                {/* min - max temp */}
                <div className="flex flex-col lg:flex-row justify-center gap-4">
                  <span className="flex items-center text-blue-500">
                    <ArrowDown className="mr-1 h-4 w-4" /> min {""}
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center text-red-500">
                    <ArrowUp className="mr-1 h-4 w-4" /> max {""}
                    {formatTemp(day.temp_max)}
                  </span>
                </div>
                {/* humidity & wind speed */}
                <div className="flex flex-col lg:flex-row  justify-end gap-4 ">
                  <span className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.humidity}%</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind}m/s</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
