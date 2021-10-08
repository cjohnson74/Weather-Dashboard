var searchHistory = [];
var apiKey = "2b2330fdc990767100b269866f403c79";
var rootUrl = "https://api.openweathermap.org";

var searchForm = document.querySelector("#search-form");
var searchFormHistory = document.querySelectorAll("#submit-button-history")
var searchInput = document.querySelector("#search-input");
var currentWeather = document.querySelector("#today");
var forecastWeather = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");
var day1 = document.querySelector("#day1");
var day2 = document.querySelector("#day2");
var day3 = document.querySelector("#day3");
var day4 = document.querySelector("#day4");
var day5 = document.querySelector("#day5");
var forecastHeader = document.querySelector("#forecast5");
var localStorageKey = 0;
var localStorageValue = [];
// var searchFormHistory = [];
// for (var i = 0; i < localStorage.length; i++){
//     searchFormHistory[i] = document.querySelector("#" +  localStorage.getItem(i));
// }


var currentTemp = 0;
var dayTemp1 = 0;
var dayTemp2 = 0;
var dayTemp3 = 0;
var dayTemp4 = 0;
var dayTemp5 = 0;
var currentWind = 0;
var dayWind1 = 0;
var dayWind2 = 0;
var dayWind3 = 0;
var dayWind4 = 0;
var dayWind5 = 0;
var currentHumidity = 0;
var dayHum1 = 0;
var dayHum2 = 0;
var dayHum3 = 0;
var dayHum4 = 0;
var dayHum5 = 0;
var currentUv = 0;

var uvClass;

var currentIcon;
var dayIcon1;
var dayIcon2;
var dayIcon3;
var dayIcon4;
var dayIcon5;

// var dayUv1 = 0;
// var dayUv2 = 0;
// var dayUv3 = 0;
// var dayUv4 = 0;
// var dayUv5 = 0;
var city;
var equalsTo = false;

for(var i = 0; i < localStorage.length; i++){
    if (localStorage.key(i) == "SettingsPreferences" || localStorage.key(i) == "recentMovieSearches") {
        equalsTo = true;
    }
    if (!equalsTo) {
        console.log("made it");
        console.log(location);
        $("#history").append("<button type='button' onClick='getLatLongHistory(this.id)' class='btn btn-secondary col-lg-12 rounded my-2 submit-button-history' id='" + localStorage.key(i) + "' aria-label='submit search'>" + localStorage.key(i) + "</button>")
    }
}


function getLatLong(event){
    event.preventDefault();
    console.log(event);
    city = searchInput.value.trim();
    var coordinatesUrl = rootUrl + "/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
    console.log(city);
    addToHistory(city);
    fetch(coordinatesUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
        console.log(data);
        console.log(data[0].lat, data[0].lon);
        var cityObj = {latitude: "", longitude: ""}
        var cityObj = {latitude: (data[0].lat), longitude: (data[0].lon)};
        console.log(cityObj)
        localStorage.setItem(city, JSON.stringify(cityObj));
        getWeather(cityObj);
    }); 
}

$(".submit-button-history").click(function() {
    var fired_button = $(this).text();
    console.log($(this).text())
    console.log(fired_button);
    getLatLongHistory(fired_button);
});

function getLatLongHistory(location){
    // event.preventDefault();
    city = location;
    var coordinatesUrl = rootUrl + "/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey;
    console.log(city);

    localStorage.getItem(city);
    var cityObj = JSON.parse(localStorage.getItem(city));

    fetch(coordinatesUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
        console.log(data);
        console.log(data[0].lat, data[0].lon);
        getWeather(cityObj);
    });    
}

function getWeather({latitude, longitude}){
    console.log("inside getWeather() function")
    console.log(latitude, longitude);
    var weatherUrl = rootUrl + "/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

    currentWeather.innerHTML = "<section id='today' class='mt-3' role='region' aria-live='polite'></section>";
    day1.innerHTML = "<div id='day1' class='col-lg-12 text-white'></div>";
    day2.innerHTML = "<div id='day2' class='col-lg-12 text-white'></div>";
    day3.innerHTML = "<div id='day3' class='col-lg-12 text-white'></div>";
    day4.innerHTML = "<div id='day4' class='col-lg-12 text-white'></div>";
    day5.innerHTML = "<div id='day5' class='col-lg-12 text-white'></div>";
    forecastHeader.innerHTML = "<div id='forecast5' class='row'></div>";

    // currentWeather.innerHTML = "<div class='col-lg-12 border border-secondary py-3 px-4 mt-3'><div class='row'><h2>" + city + " " + moment().format("L") + "</h2><img src='http://openweathermap.org/img/wn/" + todayWeatherIcon + "@2x.png'></div><div class='row'><h4 id='today1'>Temp: </h4></div><div class='row'><h4 id='today2'>Wind: </h4></div><div class='row'><h4 id='today3'>Humidity: </h4></div><div class='row'><h4 id='today4'>UV Index: <span id='uv'></span></h4></div></div>";
    // day1.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(1, 'days').format("L") + "</h4></div><div class='row'><img src='http://openweathermap.org/img/wn/" + day1WeatherIcon + "@2x.png'></div><div class='row'><h4 id='1day1'>Temp: </h4></div><div class='row'><h4 id='1day2'>Wind: </h4></div><div class='row'><h4 id='1day3'>Humidity: </h4></div></div>";
    // day2.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(2, 'days').format("L") + "</h4></div><div class='row'><img src='http://openweathermap.org/img/wn/" + day2WeatherIcon + "@2x.png'><div class='row'><h4 id='2day1'>Temp: </h4></div><div class='row'><h4 id='2day2'>Wind: </h4></div><div class='row'><h4 id='2day3'>Humidity: </h4></div></div>";
    // day3.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(3, 'days').format("L") + "</h4></div><div class='row'><img src='http://openweathermap.org/img/wn/" + day3WeatherIcon + "@2x.png'><div class='row'><h4 id='3day1'>Temp: </h4></div><div class='row'><h4 id='3day2'>Wind: </h4></div><div class='row'><h4 id='3day3'>Humidity: </h4></div></div>";
    // day4.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(4, 'days').format("L") + "</h4></div><div class='row'><img src='http://openweathermap.org/img/wn/" + day4WeatherIcon + "@2x.png'><div class='row'><h4 id='4day1'>Temp: </h4></div><div class='row'><h4 id='4day2'>Wind: </h4></div><div class='row'><h4 id='4day3'>Humidity: </h4></div></div>";
    // day5.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(5, 'days').format("L") + "</h4></div><div class='row'><img src='http://openweathermap.org/img/wn/" + day5WeatherIcon + "@2x.png'><div class='row'><h4 id='5day1'>Temp: </h4></div><div class='row'><h4 id='5day2'>Wind: </h4></div><div class='row'><h4 id='5day3'>Humidity: </h4></div></div>";
    // forecastHeader.innerHTML = "<h2 class='row'>5-Day Forecast:</h2>";

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
        console.log(data);
        currentTemp = ((data.current.temp - 273.15) * 9/5 + 32).toFixed(2) + "&deg;F";
        // console.log(currentTemp);
        todayWeatherIcon = (data.current.weather[0].icon);
        currentWind = (data.current.wind_speed + " MPH");
        // console.log(currentWind);
        currentHumidity = (data.current.humidity + "%");
        // console.log(currentHumidity);
        currentUv = (data.current.uvi);
        // console.log(currentUv);
        day1WeatherIcon = (data.daily[0].weather[0].icon);
        dayTemp1 = ((data.daily[0].temp.day - 273.15) * 9/5 + 32).toFixed(2) + "&deg;F";
        dayWind1 = (data.daily[0].wind_speed + " MPH");
        dayHum1 = (data.daily[0].humidity + "%");
        // dayUv1 = (data.daily[0].uvi);
        day2WeatherIcon = (data.daily[1].weather[0].icon);
        dayTemp2 = ((data.daily[1].temp.day - 273.15) * 9/5 + 32).toFixed(2) + "&deg;F";
        dayWind2 = (data.daily[1].wind_speed + " MPH");
        dayHum2 = (data.daily[1].humidity + "%");
        // dayUv2 = (data.daily[1].uvi);
        day3WeatherIcon = (data.daily[2].weather[0].icon);
        dayTemp3 = ((data.daily[2].temp.day - 273.15) * 9/5 + 32).toFixed(2) + "&deg;F";
        dayWind3 = (data.daily[2].wind_speed + " MPH");
        dayHum3 = (data.daily[2].humidity + "%");
        // dayUv3 = (data.daily[2].uvi);
        day4WeatherIcon = (data.daily[3].weather[0].icon);
        dayTemp4 = ((data.daily[3].temp.day - 273.15) * 9/5 + 32).toFixed(2) + "&deg;F";
        dayWind4 = (data.daily[3].wind_speed + " MPH");
        dayHum4 = (data.daily[3].humidity + "%");
        // dayUv4 = (data.daily[3].uvi);
        day5WeatherIcon = (data.daily[4].weather[0].icon);
        dayTemp5 = ((data.daily[4].temp.day - 273.15) * 9/5 + 32).toFixed(2) + "&deg;F";
        dayWind5 = (data.daily[4].wind_speed + " MPH");
        dayHum5 = (data.daily[4].humidity + "%");
        // dayUv5 = (data.daily[4].uvi);
        
        currentWeather.innerHTML = "<div class='col-lg-12 border border-secondary py-3 px-4 mt-3'><div class='row'><heading class='customHeading'>" + city + " " + moment().format("L") + "</heading><img src='http://openweathermap.org/img/wn/" + todayWeatherIcon + ".png'></div><div class='row'><h4 class='row m-0 lh-lg py-3' id='today1'>Temp: </h4></div><div class='row'><h4 class='row m-0 lh-lg py-3' id='today2'>Wind: </h4></div><div class='row'><h4 class='row m-0 lh-lg py-3' id='today3'>Humidity: </h4></div><div class='row'><h4 class='row m-0 lh-lg py-3' id='today4'>UV Index: </h4></div></div>";
        day1.innerHTML = "<div class='col-lg-12 bg-dark text-white px-3'><div class='row px-2'><h4 class='lh-lg pt-2 mb-0'>" + moment().add(1, 'days').format("L") + "</h4></div><div class='row px-2'><img src='http://openweathermap.org/img/wn/" + day1WeatherIcon + "@2x.png'></div><div class='row px-2'><h4 class='row m-0 lh-lg pb-2' id='1day1'>Temp: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='1day2'>Wind: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='1day3'>Humidity: </h4></div></div>";
        day2.innerHTML = "<div class='col-lg-12 bg-dark text-white px-3'><div class='row px-2'><h4 class='lh-lg pt-2 mb-0'>" + moment().add(2, 'days').format("L") + "</h4></div><div class='row px-2'><img src='http://openweathermap.org/img/wn/" + day2WeatherIcon + "@2x.png'></div><div class='row px-2'><h4 class='row m-0 lh-lg pb-2' id='2day1'>Temp: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='2day2'>Wind: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='2day3'>Humidity: </h4></div></div>";
        day3.innerHTML = "<div class='col-lg-12 bg-dark text-white px-3'><div class='row px-2'><h4 class='lh-lg pt-2 mb-0'>" + moment().add(3, 'days').format("L") + "</h4></div><div class='row px-2'><img src='http://openweathermap.org/img/wn/" + day3WeatherIcon + "@2x.png'></div><div class='row px-2'><h4 class='row m-0 lh-lg pb-2' id='3day1'>Temp: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='3day2'>Wind: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='3day3'>Humidity: </h4></div></div>";
        day4.innerHTML = "<div class='col-lg-12 bg-dark text-white px-3'><div class='row px-2'><h4 class='lh-lg pt-2 mb-0'>" + moment().add(4, 'days').format("L") + "</h4></div><div class='row px-2'><img src='http://openweathermap.org/img/wn/" + day4WeatherIcon + "@2x.png'></div><div class='row px-2'><h4 class='row m-0 lh-lg pb-2' id='4day1'>Temp: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='4day2'>Wind: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='4day3'>Humidity: </h4></div></div>";
        day5.innerHTML = "<div class='col-lg-12 bg-dark text-white px-3'><div class='row px-2'><h4 class='lh-lg pt-2 mb-0'>" + moment().add(5, 'days').format("L") + "</h4></div><div class='row px-2'><img src='http://openweathermap.org/img/wn/" + day5WeatherIcon + "@2x.png'></div><div class='row px-2'><h4 class='row m-0 lh-lg pb-2' id='5day1'>Temp: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='5day2'>Wind: </h4></div><div class='row px-2'><h4 class='row m-0 lh-lg py-2' id='5day3'>Humidity: </h4></div></div>";
        forecastHeader.innerHTML = "<heading class='row mx-0 customHeading'>5-Day Forecast:</heading>";

        displayToday(currentTemp, currentWind, currentHumidity, currentUv);
        displayForecastDay1(dayTemp1, dayWind1, dayHum1);
        displayForecastDay2(dayTemp2, dayWind2, dayHum2);
        displayForecastDay3(dayTemp3, dayWind3, dayHum3);
        displayForecastDay4(dayTemp4, dayWind4, dayHum4);
        displayForecastDay5(dayTemp5, dayWind5, dayHum5);
    });
  
}

function displayToday(temp, wind, hum, uv){
    if (uv <= 2){
        uvClass = "bg-success bg-gradiant rounded py-1 px-4";
    } else if (uv <= 7) {
        uvClass = "bg-warning bg-gradiant rounded py-1 px-4";
    } else if (uv > 7){
        uvClass = "bg-danger bg-gradiant rounded py-1 px-4";
    }
    // currentWeather.innerHTML = "<div class='col-lg-12 border border-secondary py-3 px-4 mt-3'><div class='row'><h2>" + city + " " + moment().format("L") + "</h2></div><div class='row'><h4 id='today1'>Temp: </h4></div><div class='row'><h4 id='today2'>Wind: </h4></div><div class='row'><h4 id='today3'>Humidity: </h4></div><div class='row'><h4 id='today4'>UV Index: <span id='uv'></span></h4></div></div>";
    $("#today1").append("<h4>" + temp +"</h4>");
    $("#today2").append("<h4>" + wind + "</h4>");
    $("#today3").append("<h4>" + hum + "</h4>");
    $("#today4").append("<h4 class='" + uvClass + "'>" + uv + "</h4>");
    // $("#5Day").append("<h2 class='row'>5-Day Forecast:</h2>")
}

function displayForecastDay1(temp, wind, hum){
    // day1.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(1, 'days').format("L") + "</h4></div><div class='row'><h4 id='1day1'>Temp: </h4></div><div class='row'><h4 id='1day2'>Wind: </h4></div><div class='row'><h4 id='1day3'>Humidity: </h4></div><div class='row'><h4 id='1day4'>UV Index: <span id='uv'></span></h4></div></div>";
    $("#1day1").append("<h4>" + temp + "</h4>");
    $("#1day2").append("<h4>" + wind + "</h4>");
    $("#1day3").append("<h4>" + hum + "</h4>");
    // $("#1day4").append("<h4>" + uv + "</h4>");
    console.log("Made it to Forecast1");
}

function displayForecastDay2(temp, wind, hum){
    // day2.innerHTML = "<div class='col-lg-2 bg-color'><div class='row'><h4>" + moment().add(2, 'days').format("L") + "</h4></div><div class='row'><h4 id='2day1'>Temp: </h4></div><div class='row'><h4 id='2day2'>Wind: </h4></div><div class='row'><h4 id='2day3'>Humidity: </h4></div><div class='row'><h4 id='2day4'>UV Index: <span id='uv'></span></h4></div></div>";
    $("#2day1").append("<h4>" + temp +"</h4>");
    $("#2day2").append("<h4>" + wind + "</h4>");
    $("#2day3").append("<h4>" + hum + "</h4>");
    // $("#2day4").append("<h4>" + uv + "</h4>");
    console.log("Made it to Forecast2");
}

function displayForecastDay3(temp, wind, hum){
    // day3.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(3, 'days').format("L") + "</h4></div><div class='row'><h4 id='3day1'>Temp: </h4></div><div class='row'><h4 id='3day2'>Wind: </h4></div><div class='row'><h4 id='3day3'>Humidity: </h4></div><div class='row'><h4 id='3day4'>UV Index: <span id='uv'></span></h4></div></div>";
    $("#3day1").append("<h4>" + temp +"</h4>");
    $("#3day2").append("<h4>" + wind + "</h4>");
    $("#3day3").append("<h4>" + hum + "</h4>");
    // $("#3day4").append("<h4>" + uv + "</h4>");
    console.log("Made it to Forecast3");
}

function displayForecastDay4(temp, wind, hum){
    // day4.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(4, 'days').format("L") + "</h4></div><div class='row'><h4 id='4day1'>Temp: </h4></div><div class='row'><h4 id='4day2'>Wind: </h4></div><div class='row'><h4 id='4day3'>Humidity: </h4></div><div class='row'><h4 id='4day4'>UV Index: <span id='uv'></span></h4></div></div>";
    $("#4day1").append("<h4>" + temp +"</h4>");
    $("#4day2").append("<h4>" + wind + "</h4>");
    $("#4day3").append("<h4>" + hum + "</h4>");
    // $("#4day4").append("<h4>" + uv + "</h4>");
    console.log("Made it to Forecast4");
}

function displayForecastDay5(temp, wind, hum){
    // day5.innerHTML = "<div class='col-lg-2'><div class='row'><h4>" + moment().add(5, 'days').format("L") + "</h4></div><div class='row'><h4 id='5day1'>Temp: </h4></div><div class='row'><h4 id='5day2'>Wind: </h4></div><div class='row'><h4 id='5day3'>Humidity: </h4></div><div class='row'><h4 id='5day4'>UV Index: <span id='uv'></span></h4></div></div>";
    $("#5day1").append("<h4>" + temp +"&deg;</h4>");
    $("#5day2").append("<h4>" + wind + "</h4>");
    $("#5day3").append("<h4>" + hum + "</h4>");
    // $("#5day4").append("<h4>" + uv + "</h4>");
    console.log("Made it to Forecast5");
}

function addToHistory(location) {
    var equalsTo = false;
    for(var i = 0; i < localStorage.length; i++){
        if (localStorage.key(i) == location) {
            equalsTo = true;
        }
    }
    if (!equalsTo) {
        console.log("made it");
        $("#history").append("<button type='button' onClick='getLatLongHistory(this.id)' class='btn btn-secondary col-lg-12 rounded my-2 submit-button-history' id='" + location + "' aria-label='submit search'>" + location + "</button>")
    }
}

searchForm.addEventListener("submit", getLatLong);
// searchFormHistory.addEventListener("click", getLatLongHistory);