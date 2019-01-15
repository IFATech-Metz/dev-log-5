var xhr = new XMLHttpRequest();

// Forme générale du lien :
// http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?
// date=1527811200&opacity=0.9&fill_bound=true&appid={api_key}

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "Metz";
var appid = "3c084bd74c2f77f02d6d6c30c2018bf0";

function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "appid=" + appid;
}

function init_page() {
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this);
            let weatherJson;
            weatherJson = this.responseText;
            console.log(weatherJson);
            let parsed = JSON.parse(weatherJson);
            console.log(parsed);
            document.getElementById("meteo").innerHTML = "The weather is " + parsed.weather[0].main + ", temperature is " + (Math.round(parsed.main.temp - 273.15)) + " degree celsius" + ", wind speed is " + parsed.wind.speed + "" ;
        }
    };

    xhr.open("GET", get_url(), true)
    xhr.send()
}