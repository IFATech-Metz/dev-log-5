const xhr = new XMLHttpRequest();

const base_url = "http://api.openweathermap.org/data/2.5/weather";;
const appid = "f5e810531af1756846022c6f387acf25";
const unit = "metric";
let weatherData;

let dataArray = {
    "nom": "",
    "weather": "",
    "temp": "",
    "icon": "",
    "humidity": "",
    "pressure": "",
};

function getUrl(city) {
    return base_url + "?"
        + "q=" + city + "&"
        + "appid=" + appid
        + "&units=" + unit;
}

function xmlRequest(city) {
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


function parsingWeatherData(request){
    weatherData = (request ? JSON.parse(request) : false);
    if(weatherData){
        dataArray.nom = weatherData.name;
        dataArray.weather = weatherData.weather[0].description;
        dataArray.temp = weatherData.main.temp;
        dataArray.icon = weatherData.weather[0].icon;
        dataArray.humidity = weatherData.main.humidity;
        dataArray.pressure = weatherData.main.pressure;
        addNewCard(dataArray);
    }
}

const initCard = () =>
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">" + dataArray.nom + "</h5>" +
    "           <p class=\"card-text\">" +
    "Temp: " + dataArray.weather + " <br /> " +
    "           Température: " + dataArray.temp + " <br /> " +
    "Humidité: " + dataArray.humidity + " <br /> " +
    "Préssion: " + dataArray.pressure + " <br /> " +
    "</p>" +
    "</div>"+
    "</div>";

function createNewCard(city) {
    xmlRequest(city);
}

function addNewCard() {
    let divWeather = document.getElementById("1");
    let newCardContent = document.createElement("div");
    newCardContent.className = "card";
    newCardContent.innerHTML = initCard();
    divWeather.appendChild(newCardContent);
}
