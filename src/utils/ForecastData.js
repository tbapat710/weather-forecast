import React from "react";

export const ForecastData = async (city) => {
  const resp = await fetch(
    `${process.env.REACT_APP_WEATHER_DOMAIN}?q=${city}&appid=bf34c95c549370af5a47e8d9ab56bda6`
  );
  const data = await resp.json();
  return data;
};
