const xhr = new XMLHttpRequest();

// Forme générale du lien :
// http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?
// date=1527811200&opacity=0.9&fill_bound=true&appid={api_key}

const base_url = "http://api.openweathermap.org/data/2.5/weather";;
const appid = "f5e810531af1756846022c6f387acf25";
const unit = "metric";
let weatherData;

let dataArray = {
    "weather": "",
    "temp": "",
    "icon": "",
    "humidity": "",
    "pressure": "",
}

function getUrl(city) {
    return base_url + "?"
        + "q=" + city + "&"
        + "appid=" + appid
        + "&units=" + unit;
}

function xmlRequest(city) {;
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            parsingWeatherData(this.responseText);
        }
        else{
            parsingWeatherData(false);
        }
    };
    xhr.open("GET", getUrl(city), true);
    xhr.send()
}


function onLoad() {
    xmlRequest("Metz");
}

function onClick(city) {
    xmlRequest(city);
}

function insertData() {
    let element = document.getElementById("id01");
    let info = "Temp: " + dataArray.weather + " <br /> " +
        "Température: " + dataArray.temp + " <br /> " +
        "Humidité: " + dataArray.humidity + " <br /> " +
        "Pression: " + dataArray.pressure + " <br /> ";
    element.innerHTML = info;
}

function parsingWeatherData(request){
    weatherData = (request ? JSON.parse(request) : false);
    if(weatherData){
        dataArray.weather = weatherData.weather[0].description;
        dataArray.temp = weatherData.main.temp;
        dataArray.icon = weatherData.weather[0].icon;
        dataArray.humidity = weatherData.main.humidity;
        dataArray.pressure = weatherData.main.pressure;
        console.log(dataArray);
        insertData(dataArray);
    }
}

const initCard = city =>
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">" + city + "</h5>" +
    "           <p class=\"card-text\">" +
    "Temp: " + dataArray.weather + " <br /> " +
    "           Température: " + dataArray.temp + " <br /> " +
    "Humidité: " + dataArray.humidity + " <br /> " +
    "Préssion: " + dataArray.pressure + " <br /> " +
    "</p>" +
    "</div>"+
    "</div>";

function createNewCard(city) {
    let divWeather = document.getElementById("1");
    let newCardContent = document.createElement("div")
    newCardContent.className = "card";
    newCardContent.innerHTML = initCard(city);
    divWeather.appendChild(newCardContent);
    console.log(divWeather);
}
