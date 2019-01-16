const xhr = new XMLHttpRequest();

// Forme générale du lien :
// http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?
// date=1527811200&opacity=0.9&fill_bound=true&appid={api_key}

const base_url = "http://api.openweathermap.org/data/2.5/weather";
let city;
const appid = "f5e810531af1756846022c6f387acf25";
const unit = "metric";

function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "appid=" + appid
        + "&units=" + unit;
}

function init_page() {
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let weatherJson = this.responseText;
            console.log(weatherJson);
            let parsed = JSON.parse(weatherJson);
            console.log(parsed);
            let icon = response.weather[0].icon;
            let src = "openweathermap.org/img/w/" + icon + ".png";
            document.getElementById("meteo").innerHTML = "The weather is " + parsed.weather[0].main + ", it is " + parsed.main.temp +
                " degree celsius" + " in " + parsed.name;
            document.getElementById("url").href = get_url();
            document.getElementById("icon").src = src;
        }
    };

    xhr.open("GET", get_url(), true);
    xhr.send()
}

function get_temperature() {
    city = document.getElementById("ville").value;
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let weatherJson = this.responseText;
            console.log(weatherJson);
            let parsed = JSON.parse(weatherJson);
            console.log(parsed);
            document.getElementById("meteo").innerHTML = "The weather is " + parsed.weather[0].main + ", it is " + parsed.main.temp +
                " degree celsius" + " in " + parsed.name;
            document.getElementById("url").href = get_url();
        }
    };

    xhr.open("GET", get_url(), true);
    xhr.send()
}

