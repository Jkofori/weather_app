async function checkWeather(location){
    try{
        const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+location+'&appid=1a1ad1acb995531e8ef252754f032fc3', {mode: 'cors'});
        const weatherData = await response.json();

        document.getElementById('locationCard').textContent=weatherData.name;
        document.getElementById('weatherCard').textContent=weatherData.weather[0].main;
        document.getElementById('temperatureCard').textContent=weatherData.main.temp+'° Kelvin';

        updateWeatherColor(weatherData.weather[0].main);
    } catch(error) {
        document.getElementById('locationCard').textContent='Location Not Found.';
        document.getElementById('weatherCard').textContent='Try Again.';
        document.getElementById('temperatureCard').textContent='';
        document.getElementById('weatherDiv').style.backgroundColor='#808080';

        console.log(error);
    }
}

// update color of weather card 
function updateWeatherColor(weather) {
    if(weather=='Clear'){
        document.getElementById('weatherDiv').style.backgroundColor='#87CEFA';
    } else if(weather=='Clouds'){
        document.getElementById('weatherDiv').style.backgroundColor='#808080';
    } else if(weather=='Haze'){
        document.getElementById('weatherDiv').style.backgroundColor='#fd7f00';
    }
}

function addCheckWeatherListener() {
    const locationInput = document.getElementById('locationInput');
    const checkWeatherButton = document.getElementById('checkWeatherButton');

    checkWeatherButton.addEventListener('click', function(){
        checkWeather(locationInput.value);
    });
}

function handleForm(elementID){
    document.getElementById(elementID).addEventListener('submit',
    (e)=>e.preventDefault());
}

addCheckWeatherListener();
handleForm('form');
checkWeather('Denver');