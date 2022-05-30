import { useState } from "react";
import "./App.css";
import WeatherForecast from "./components/WeatherForecast";
import classes from "./components/WeatherForecast.module.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function App() {
  // useEffect(()=>{

  //   fetch('https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=bf34c95c549370af5a47e8d9ab56bda6')
  // },[])
  const [city, setCity] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [list, setList] = useState([]);
  const [data, setData] = useState({});
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // const fetchWeatherData=async()=>{
  //   const resp=await fetch('https://api.openweathermap.org/data/2.5/forecast?q=indore&appid=bf34c95c549370af5a47e8d9ab56bda6');
  //   const data=await resp.json();
  //   console.log(data);
  //   setData(data);
  //   setLatitude(data.coord.lat);
  //   setLongitude(data.coord.lon)
  //   console.log(latitude);
  //   console.log(longitude);
  // }
  const submitHandler = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bf34c95c549370af5a47e8d9ab56bda6`
    );
    const data = await resp.json();
    console.log(data.list);
    setList(data.list);
    setCurrentLocation(city);
    setLatitude(data.city.coord.lat);
    setLongitude(data.city.coord.lon);
  };
  const getCurrentDay = (date) => {
    switch (date) {
      case 0:
        return "sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
    }
  };
  return (
    <div className="App">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search City"
      />
      <button onClick={submitHandler}>Submit</button>
      <p style={{ fontSize: "15px" }}>City: {currentLocation}</p>

      {/* <p>
        {list.map((value) => {
          const date = new Date(value.dt_txt);
          const CurrentDay = date.getDay();
          const day = getCurrentDay(CurrentDay);
          const formattedDate = new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <li key={value.dt} className={classes.listItem}>
              {day} --- {formattedDate} ----------
              {(value.main.temp_max - 273.15).toFixed(2)}&#8451; ------
              {value.weather[0].description}
            </li>
          );
        })}
      </p> */}

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
            {list.map((value) => {
              const date = new Date(value.dt_txt);
              const CurrentDay = date.getDay();
              const day = getCurrentDay(CurrentDay);
              const formattedDate = new Date(date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return (
                <TableRow>
                  <TableCell align="right">{day}</TableCell>
                  <TableCell align="right">{formattedDate}</TableCell>
                  <TableCell align="right">
                    {(value.main.temp_max - 273.15).toFixed(2)}&#8451;
                  </TableCell>
                  <TableCell align="right">
                    {value.weather[0].description}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;

//Based on city
//https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bf34c95c549370af5a47e8d9ab56bda6
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=bf34c95c549370af5a47e8d9ab56bda6
// day weather forecast
//http://api.openweathermap.org/data/2.5/forecast?appid=bf34c95c549370af5a47e8d9ab56bda6&q=indore&count=10
