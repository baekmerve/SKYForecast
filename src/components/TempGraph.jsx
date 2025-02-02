/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { format } from "date-fns";

const TempGraph = ({ data }) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    //every 3 hours
    time: format(new Date(item.dt * 1000), "ha"), // ha: hour + am/pm
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>오늘의 기온</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          {/*  make graph responsive */}
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={true}
                axisLine={true}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={true}
                axisLine={true}
                tickFormatter={(value) => `${value}°`}
              />
              {/* tooltip */}

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>

                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              체감 온도
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#82ca9d"
                strokeWidth={2}
                strokeDasharray="4 4"
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TempGraph;
