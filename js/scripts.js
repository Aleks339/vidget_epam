var textSubmit = document.getElementsByClassName("widget_input--input-submit")[0];
textSubmit.addEventListener('click', function(){
  var textOfResponse = document.getElementsByClassName("widget_input--input-search")[0];
  var resultOfResponse = document.getElementsByClassName("widget_left-side--city-name")[0];
  resultOfResponse.innerHTML = textOfResponse.value;

  var xhr = new XMLHttpRequest();
  var params = encodeURIComponent(textOfResponse.value) + '&APPID=68e023fec6a329065a271ef2867ec8a3';

  xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + params, false);
  xhr.onreadystatechange = function(){
      if(xhr.status == 200){
          var result = JSON.parse(xhr.responseText);
          var divWithTemperature = document.getElementsByClassName('widget_right-side--temperature')[0];
          divWithTemperature.innerHTML = parseInt(result.main.temp - 273.15) +  '&#176;C';
          var divWithWeatherDescription = document.getElementsByClassName('widget_left-side--rect-brown');
          divWithWeatherDescription.innerHTML = result.weather.main;
      }else{
          alert(xhr.status + ': ' + xhr.statusText);
      }
  }
  xhr.send();
});
