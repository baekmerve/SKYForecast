/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const FiveDayWeather = ({ data }) => {
  const fiveDays = data.list.slice(0, 5);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ko-KR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  };

  const formatTemp = (temp) => `${Math.round(temp)}°C`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>5일간의 일기예보</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {fiveDays.map((day, index) => {
            return (
              <div
                key={index}
                className=" grid grid-cols-4 items-center  rounded-lg border p-2"
              >
                <p className="">
                  {/* day, month, date */}
                  {formatDate(day.dt_txt)}
                </p>
                {/* temp */}
                <p className="text-center">{formatTemp(day.main.temp)}</p>

                {/* weather desc  */}

                <p className="text-sm">{day.weather[0].description}</p>

                {/* weather img   */}

                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
                  alt={day.weather[0].description}
                  className="h-[50px] w-[50px]"
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FiveDayWeather;
