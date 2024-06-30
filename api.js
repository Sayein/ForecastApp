let displayweather = {

  key: 'daaab66f88053202e572ccb7149b2d29',

  getweather(city) {
    let a = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}&units=metric`;
    fetch(a).then(res =>  {
      if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
    }
    ).then(weatherdata => this.show(weatherdata))
    .catch(error => {
      document.querySelector('.city').innerText = `Invalid city name.`;
    })
  
  },

  show(data) {
    const { name } = data;
    const { country } = data.sys;
    const { temp, humidity } = data.main;
    const { icon, main } = data.weather[0];
    const { speed } = data.wind;
    const { lat, lon } = data.coord;

    // connecting the javascript with the html 

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".wicon").src = "https://openweathermap.org/img/wn/" + icon + "@2x" + ".png";
    document.querySelector(".description").innerText = main;
    document.querySelector(".temp").innerText = temp.toFixed(0) + "°C";
    document.querySelector(".humidityvalue").innerText = humidity + "%";
    document.querySelector(".windspeedvalue").innerText = (speed * (3.6)).toFixed(0) + " km/h";
    document.querySelector(".latitudevalue").innerText = lat;
    document.querySelector(".longitudevalue").innerText = lon;


    //this is the api u must use rather than forecast it is one call api https://api.openweathermap.org/data/2.5/onecall?lat=19.0144&lon=72.8479&exclude=hourly,minutely,alerts&appid=daaab66f88053202e572ccb7149b2d29

    let b = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${this.key}&units=metric`
    fetch(b).then(res => res.json()).then(forcastdata => this.forcast(forcastdata))

  },

  //js for forecast  

  forcast(newdata) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let today = new Date().getDay();

    let rotatedDays = days.slice(today).concat(days.slice(0, today));

    let dayelement = document.querySelectorAll(".days");
    let forecasticon = document.querySelectorAll(".dicon");
    let minimumtemp = document.querySelectorAll(".min");
    let maximumtemp = document.querySelectorAll(".max");


    for (let i = 0; i < dayelement.length; i++) {
      const { icon } = newdata.daily[i].weather[0];

      dayelement[i].innerHTML = rotatedDays[i];
      forecasticon[i].src = "https://openweathermap.org/img/wn/" + icon + ".png";
      minimumtemp[i].innerHTML = "Min: " + newdata.daily[i].temp.min + " °C";
      maximumtemp[i].innerHTML = "Max: " + newdata.daily[i].temp.max + " °C";

    }

  },

  //js for search bar 

  search: function () {
    this.getweather(document.getElementById("sb").value)
  }

};


document.getElementById("sb").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    displayweather.search();
  }

});


displayweather.getweather("mumbai");


