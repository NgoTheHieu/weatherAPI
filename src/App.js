import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  async getWeather(longitude,latitude) {
    const API_KEY = "b7019df6751a50efffde06f5ca6284f7";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data)
    this.setState({
      locationName: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description
      // put in more here
    });
  };

  getLocation  = () => {
    navigator.geolocation.getCurrentPosition((post) => {
      this.getWeather(post.coords.longitude, post.coords.latitude)
    });
  }
  constructor(props){
    super(props);
    this.state = {
      data:null,
      
     isLoading: true
    };
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    return (
      <div className="container-fluid text-white my-auto">
        <div className="container mx-auto my-4 py-4">
          <div className="row justify-content-center text-center">
            <h1 className="col-12 display-4 my-2 py-3 text-success">
              Awesome Weather App
            </h1>
            <h2 className="col-12">LocationName:{this.state.locationName}</h2>
            
            <h3>Temperature:{this.state.temperature}F</h3>
            <h3 className="col-12 text-danger">Temperature:{this.state.temperature}C</h3>
            <h3 className="col-12">Description:{this.state.description}</h3>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
