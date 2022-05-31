import React from "react";

export const ForecastData = async (city) => {
  const resp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bf34c95c549370af5a47e8d9ab56bda6`
  );
  const data = await resp.json();
  return data;
};
