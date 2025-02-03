/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import React from "react";
import {
  Sunset,
  EyeIcon,
  WindIcon,
  Sunrise,
  Thermometer,
  DropletsIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const WeatherDetails = ({ weatherData, airQualityData }) => {
  const { wind, main, sys, visibility } = weatherData;
  const airQualityIndex = airQualityData?.list[0]?.main?.aqi; // Accessing aqi from airQualityData.main
  const { co, no, no2, o3 } = airQualityData?.list[0]?.components || {};

  // Format time using date-fns
  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const sunTimes = [
    {
      title: "일출",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "일몰",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
  ];

  const AirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return ["좋음", "bg-green-500"];
      case 2:
        return ["보통", "bg-yellow-500"];
      case 3:
        return ["나쁨", "bg-orange-500"];

      case 4:
        return ["해로움", "bg-pink-400"];
      case 5:
        return ["위험", "bg-red-500"];
      default:
        return "Unknown";
    }
  };

  const AirQualityList = [
    {
      title: "CO",
      value: `${co} µg/m³`,
    },
    {
      title: "NO",
      value: `${no} µg/m³`,
    },
    {
      title: "NO₂",
      value: `${no2} µg/m³`,
    },
    {
      title: "O₃",
      value: `${o3} µg/m³`,
    },
  ];

  const highlights = [
    {
      title: "습도",
      value: `${main.humidity}%`,
      icon: DropletsIcon,
      color: "text-blue-400",
    },
    {
      title: "체감 온도",
      value: `${Math.round(main.feels_like)}°C`,
      icon: Thermometer,
      color: "text-red-400",
    },
    {
      title: "풍속",

      value: `${Math.round(wind.speed)} m/s`,
      icon: WindIcon,
      color: "text-purple-300",
    },
    {
      title: "가시거리",
      value: `${visibility / 1000} km`,
      icon: EyeIcon,
      color: "text-gray-400",
    },
  ];
  return (
    <Card className="overflow-hidden ">
      <CardHeader>
        <CardTitle className="text-xl">하이라이트</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <div className="grid lg:grid-cols-2 gap-4">
          {/* air quality data */}
          <div className="p-2 space-y-4 flex-col rounded-lg">
            <div className="flex justify-between items-center">
              <p className=" text-lg font-semibold text-cyan-400">
                대기질 지수
              </p>
              <p
                className={`${
                  AirQualityDescription(airQualityIndex)[1]
                }  py-1 px-4 text-sm rounded-md`}
              >
                {AirQualityDescription(airQualityIndex)[0]}
              </p>
            </div>
            {/* CO, NO, No2, O3 data */}
            <div className="grid grid-cols-2 gap-2 ">
              {AirQualityList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border text-center rounded-lg py-3"
                  >
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">{item.value} </p>
                  </div>
                );
              })}
            </div>
          </div>
          {/* sunrise & sunset */}
          <div className="p-2 space-y-4 flex-col">
            <p className="text-pink-700 text-lg font-semibold ">일출 및 일몰</p>
            <div className="grid grid-cols-2 gap-4">
              {sunTimes.map((sun, index) => {
                return (
                  <div
                    key={index}
                    className="flex-col place-items-center rounded-lg border py-4 text-center"
                  >
                    <sun.icon className={`h-8 w-8 mb-5 ${sun.color}`} />
                    <div className="space-y-2 mb-3">
                      <p className=" font-medium leading-none">{sun.title}</p>
                      <p className="text-sm ">{sun.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* highlights */}
        <div className=" p-2 space-y-4 ">
          <p className="text-green-400 text-lg font-semibold">날씨 상세</p>

          <div className="px-2 grid gap-4 grid-cols-2  lg:grid-cols-4 ">
            {highlights.map((detail) => {
              return (
                <div
                  key={detail.title}
                  className="flex-col items-center rounded-lg border p-4 justify-between space-y-4"
                >
                  <p className="font-medium leading-none">{detail.title}</p>

                  <div className="flex justify-between">
                    <detail.icon className={`h-7 w-7 ${detail.color}`} />
                    <p>{detail.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
