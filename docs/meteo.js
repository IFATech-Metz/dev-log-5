const xhr = new XMLHttpRequest();


const base_url = "https://api.openweathermap.org/data/2.5/weather";;
const appid = "f5e810531af1756846022c6f387acf25";
const unit = "metric";
let weatherData;

let dataArray = {
    "name": "",
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
            addNewCard(this.responseText);
        }
        else{
            return false
        }
    };
    xhr.open("GET", getUrl(city), true);
    xhr.send()
}

function parsingWeatherData(request){
    weatherData = (request ? JSON.parse(request) : false);
    if(weatherData){
        dataArray.name = weatherData.name;
        dataArray.weather = weatherData.weather[0].description;
        dataArray.temp = weatherData.main.temp;
        dataArray.icon = weatherData.weather[0].icon;
        dataArray.humidity = weatherData.main.humidity;
        dataArray.pressure = weatherData.main.pressure;
    }
}

const initCard = (id) =>
    "<div class=\"card-body\">" +
    "<h5 class=\"card-title\">" + dataArray.name +
    "<button class=\"btn btn-danger\" id=" + id +" onClick=\"deleteCard(this.id)\">" + "-" +
    "</button>" +
    "</h5>" +
    "<p class=\"card-text\">" +
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

let cardArray = [];

function addNewCard(request) {
    parsingWeatherData(request);
    let newCard = document.createElement("div");
    newCard.className = "card";
    let newId = "" + cardArray.length;
    newCard.setAttribute("id", newId);
    newCard.innerHTML = initCard(newId);
    cardArray = [...cardArray, newCard];
    displayCardArray(cardArray);
}

function displayCardArray(cardArray) {
    let divWeather = document.getElementById("1w");
    console.log(cardArray);
    divWeather.innerHTML = "";
    for(let i = 0; i < cardArray.length; i++) {
        divWeather.appendChild(cardArray[i]);
    }
}

function deleteCard(id){
    console.log(id);
    let newCardArray = [];
        for (let i = 0; i < cardArray.length; i++) {
            if (cardArray[i].id !== id) {
                let tempCard = cardArray[i];
                newCardArray = [...newCardArray, tempCard];
            }
        }
    cardArray = newCardArray;
    displayCardArray(cardArray);
}

