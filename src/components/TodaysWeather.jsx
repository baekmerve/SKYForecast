/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  MapPin,
  ThermometerSnowflake,
  ThermometerSun,
} from "lucide-react";

export const TodaysWeather = ({ data }) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max },
  } = data;

  const date = data?.dt || null;

  const currentDate = date
    ? new Date(date * 1000).toLocaleDateString("ko-KR", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date not available";



  return (
    <Card className="overflow-hidden  h-full ">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-4">
            {/* date info */}
            <div className="flex items-center text-muted-foreground">
              <CalendarDays className="mr-2 h-6 w-6 " />
              {currentDate}
            </div>
            {/*  city, country  infos */}
            <div className="flex items-end gap-1 ">
              <MapPin className="mr-2 h-6 w-6" />
              <h2 className="text-3xl font-bold tracking-tighter mr-2">
                {data?.name},
              </h2>
              <span className="text-lg text-muted-foreground">
                {data.sys?.country}
              </span>
            </div>

            <div className="flex justify-between  items-center">
              {/*  temp & feels like infos div */}
              <div className="flex-col justify-center">
                {/*  temp info  */}
                <div className="flex items-center justify-start">
                  <p className="text-7xl font-bold ">{Math.round(temp)}</p>
                  <span className="text-4xl ml-1 mr-5">°C</span>
                </div>
                {/*  feels like  */}
                <p className="text-sm font-medium text-muted-foreground">
                  체감 온도 {Math.round(feels_like)} °C
                </p>
              </div>
              {/*  weather image & desc div */}
              <div className="flex-col">
                <p className="text-sm font-medium capitalize text-center ">
                  {currentWeather.description}
                </p>

                {/*  weather image  */}
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                  alt={currentWeather.description}
                  className="h-[100px] w-[100px]"
                />
                {/* weather desc */}
              </div>
            </div>
          </div>

          {/*  min & max temp */}
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex items-center gap-2">
              <ThermometerSnowflake className="h-4 w-4 text-blue-400" />
              <div className="space-y-0 5">
                <p className="text-sm font-medium">
                  최저기온:
                  <span className="ml-2 text-sm font-muted-foreground">
                    {Math.round(temp_min)} °C
                  </span>
                </p>
              </div>
            </div>

            {/*  wind */}
            <div className="flex items-center gap-2">
              <ThermometerSun className="h-4 w-4 text-red-400" />
              <div className="space-y-0 5">
                <p className="text-sm font-medium ">
                  최고기온:
                  <span className="ml-2 text-sm font-muted-foreground">
                    {Math.round(temp_max)} °C
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
