const xhr = new XMLHttpRequest();


const forcast_url = "http://api.openweathermap.org/data/2.5/forecast/daily";
const current_url = "http://api.openweathermap.org/data/2.5/weather";
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
let forecastArray;

function getUrlCurrent(city) {
    return current_url + "?"
        + "q=" + city + "&"
        + "appid=" + appid
        + "&units=" + unit
        + "&lang=fr";
}

function getUrlForecast(city) {
    return forcast_url + "?"
        + "q=" + city + "&"
        + "appid=" + appid
        + "&cnt=4"
        + "&units=" + unit
        + "&lang=fr";
}

function xmlRequestDaily(city) {
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            xmlRequestForecast(city, this.responseText);
        }
        else{
            return false
        }
    };
    xhr.open("GET", getUrlCurrent(city), true);
    xhr.send()
}

function xmlRequestForecast(city, dailyData) {
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            addNewCard(this.responseText, dailyData);
        }
        else{
            return false
        }
    };
    xhr.open("GET", getUrlForecast(city), true);
    xhr.send()
}

function parsingWeatherData(requestForecast, requestDaily){
    let foreData = (requestForecast ? JSON.parse(requestForecast) : false);
    let weatherData = (requestDaily ? JSON.parse(requestDaily) : false);

    if(weatherData){
        dataArray.name = weatherData.name;
        dataArray.weather = weatherData.weather[0].description;
        dataArray.temp = Math.round(weatherData.main.temp);
        dataArray.icon = "./img/" + weatherData.weather[0].icon + ".png";
        dataArray.humidity = weatherData.main.humidity;
        dataArray.pressure = Math.round(weatherData.main.pressure);
    }
    if(foreData){
        forecastArray = [];
        console.log(foreData);
        for (let i = 1; i < 4; i++){
            let forecastData = {
                "icon": "",
                "min": "",
                "max": "",
                "avg": "",
                "d": "",
            };
            forecastData.icon = "./img/" + foreData.list[i].weather[0].icon + ".png";
            forecastData.avg = foreData.list[i].temp.day;
            forecastData.min = foreData.list[i].temp.min;
            forecastData.max = foreData.list[i].temp.max;

            //Getting 3 first day char to french and first char to Upper Case
            let  d = new Date(foreData.list[i].dt*1000);
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            let j = d.toLocaleDateString('fr-FR', options);
            j = j.slice(0,3);
            forecastData.d = j.charAt(0).toUpperCase() + j.slice(1);
            forecastArray = [...forecastArray, forecastData];
        }
        console.log(forecastArray);
    }
}

const initCard = (id) =>
    "<h5 class=\"card-title\">" + dataArray.name +
    "</h5>" +
    "<div class=\"card-body\">" +
        "<div class=\"card-body card-main\">" +
                "<img class='large' src=" + dataArray.icon + " />" +
                "<div class='res'>" +
                    "<h3>" + dataArray.temp + "°" + "</h3>" +
                    "<h6>" + dataArray.weather +"</h6>" +
                "</div> " +
                "<div class='left'>" +
                    "<img class='iconh' src='./img/hum.svg' />" + dataArray.humidity + " " +
                    "<img class='iconp' src='./img/pressure.png' />" + dataArray.pressure +
                "</div>" +
            "</div>" +
            "<div class=\"card-text\">" +
                "<div class=\"forecast\">" +
                    "<div class=\"day\">" +
                        forecastArray[0].d +
                    "</div>" +
                    "<img class='mini' src=" + forecastArray[0].icon + " />" +
                    "<div class=\"max\">" +
                    Math.round(forecastArray[0].max )+
                    "</div>" +
                    "<div class=\"avg\">" +
                        Math.round(forecastArray[0].avg )+
                    "</div>" +
                    "<div class=\"min\">" +
                            Math.round(  forecastArray[0].min )+
                    "</div>" +
                "</div>" +
                "<div class=\"forecast\">" +
                "<div class=\"day\">" +
                forecastArray[1].d +
                "</div>" +
                "<img class='mini' src=" + forecastArray[1].icon + " />" +
                "<div class=\"max\">" +
                Math.round(forecastArray[1].max )+
                "</div>" +
                "<div class=\"avg\">" +
                Math.round(forecastArray[1].avg )+
                "</div>" +
                "<div class=\"min\">" +
                Math.round(  forecastArray[1].min )+
                "</div>" +
                "</div>" +
                "<div class=\"forecast\">" +
                "<div class=\"day\">" +
                forecastArray[2].d +
                "</div>" +
                "<img class='mini' src=" + forecastArray[2].icon + " />" +
                "<div class=\"max\">" +
                Math.round(forecastArray[2].max )+
                "</div>" +
                "<div class=\"avg\">" +
                Math.round(forecastArray[2].avg )+
                "</div>" +
                "<div class=\"min\">" +
                Math.round(  forecastArray[2].min )+
                "</div>" +
                "</div>" +
        "</div>"+
    "</div>"+
    "<div class=\"hovicon effect-3 sub-a small\" id=" + id +" onClick=\"deleteCard(this.id)\">" + "-" + "</div>";

function createNewCard(city) {
    if (cardArray.length < 8) {
        xmlRequestDaily(city);
    }
}
function handleKeyPress(event,city) {
    if(event.key === "Enter"){
        createNewCard(city);
    }
}

let cardArray = [];

function addNewCard(requestForecast, requestDaily) {
    parsingWeatherData(requestForecast, requestDaily);
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
    divWeather.innerHTML = "";
    for(let i = 0; i < cardArray.length; i++) {
        divWeather.appendChild(cardArray[i]);
    }
    let numCard = document.getElementById("numcard");
    numCard.innerHTML = "" + cardArray.length + "/8";
    console.log(numCard);
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