import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ForecastData } from "../utils/ForecastData";
import moment from 'moment';

const WeatherForecast = (props) => {
  const [city, setCity] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [list, setList] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data=await ForecastData(city)
    console.log(data.list);
    setList(data.list);
    setCurrentLocation(city);
  };

  return (
    <>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search City"
      />
      <button onClick={submitHandler}>Submit</button>
      <p style={{ fontSize: "15px" }}>City: {currentLocation}</p>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Day</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">Weather Condition</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((value, index) => {
              const date = new Date(value.dt_txt);
              const CurrentDay = moment(date).format('dddd')
              console.log(CurrentDay);
              const formattedDate = new Date(date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              if (index % 8 === 0) {
                return (
                  <TableRow>
                    <TableCell align="right">{CurrentDay}</TableCell>
                    <TableCell align="right">{formattedDate}</TableCell>
                    <TableCell align="right">
                      {(value.main.temp_max - 273.15).toFixed(2)}&#8451;
                    </TableCell>
                    <TableCell align="right">
                      {value.weather[0].description}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default WeatherForecast;
