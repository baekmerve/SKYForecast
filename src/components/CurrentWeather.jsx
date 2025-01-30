/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

export const CurrentWeather = ({ data, locationName }) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp) => `${Math.round(temp)}°C`;
  return (
    <Card className="overflow-hidden 0">
      <CardContent
        className="p-6 "
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              {/*  location  infos */}
              <div className="flex items-end gap-1">
                <h2 className="text-2xl font-bold tracking-tighter">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-muted-foreground">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
            </div>

            {/*  weather  infos */}
            <div className="flex items-center gap-2">
              <p className="text-7xl font-bold tracking-tight">
                {formatTemp(temp)}
              </p>
              {/*  feels like temp */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
              </div>
            </div>

            {/*  min temp */}
            <div className="grid grid-cols-2 gap-4 ">
              <span className="flex items-center gap-1 text-blue-500">
                <ArrowDown className="h-3 w-3" />
                {formatTemp(temp_min)}
              </span>
              {/*  max temp */}
              <span className="flex items-center gap-1 text-red-500 ">
                <ArrowUp className="h-3 w-3" />
                {formatTemp(temp_max)}
              </span>
            </div>

            {/*  humidity */}
            <div className="grid grid-cols-2 gap-4 ">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div className="space-y-0 5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm font-muted-foreground">{humidity}%</p>
                </div>
              </div>

              {/*  wind */}
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-blue-500" />
                <div className="space-y-0 5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm font-muted-foreground">{speed}m/s</p>
                </div>
              </div>
            </div>
          </div>

          {/*  weather image */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
              />
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
