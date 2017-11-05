var textSubmit = document.getElementsByClassName("widget_input--input-submit")[0];
var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var forecastOnOneDay = function(jsonResult1, jsonResult2, firstClass, secondClass, thirdClass){
    var firstDiv = document.getElementsByClassName(firstClass)[0];
    var secondDiv = document.getElementsByClassName(secondClass)[0];
    var thirdDiv = document.getElementsByClassName(thirdClass)[0];
    var day = new Date(jsonResult1.dt*1000);
    var dateString = weekdays[day.getDay()];
    firstDiv.innerHTML = dateString;
    secondDiv.innerHTML = parseInt(jsonResult1.main.temp - 273.15) +  '&#176;C';
    thirdDiv.innerHTML = parseInt(jsonResult2.main.temp - 273.15) +  '&#176;C';
}
textSubmit.addEventListener('click', function(){
  var textOfResponse = document.getElementsByClassName("widget_input--input-search")[0];
  var resultOfResponse = document.getElementsByClassName("widget_left-side--city-name")[0];
  resultOfResponse.innerHTML = textOfResponse.value;

  var xhr = new XMLHttpRequest();
  var params = encodeURIComponent(textOfResponse.value) + '&APPID=68e023fec6a329065a271ef2867ec8a3';
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

  xhr.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=' + params, false);
  xhr.onreadystatechange = function(){
      if(xhr.status == 200){
          var fullResult = JSON.parse(xhr.responseText);
          var result = fullResult.list[0];
          var divWithTemperature = document.getElementsByClassName('widget_right-side--temperature')[0];
          divWithTemperature.innerHTML = parseInt(result.main.temp - 273.15) +  '&#176;C';
          var divWithWeatherDescription = document.getElementsByClassName('widget_left-side--rect-brown')[0];
          divWithWeatherDescription.innerHTML = result.weather[0].main;
          var today = new Date(result.dt*1000);
          console.log(today.getHours());
          var dateString = weekdays[today.getDay()] + ', ' + months[today.getMonth()] + ' ' + today.getDate();
          document.getElementsByClassName('widget_left-side--date')[0].innerHTML = dateString;
          var morningHoursIndex = (33 - today.getHours()) / 3;
          var eveningHoursIndex = morningHoursIndex + 4;
          forecastOnOneDay(fullResult.list[morningHoursIndex], fullResult.list[eveningHoursIndex], 'widget_right-side--week1', "widget_right-side--morning-temperature1", "widget_right-side--evening-temperature1");
          forecastOnOneDay(fullResult.list[morningHoursIndex + 8], fullResult.list[eveningHoursIndex + 8], 'widget_right-side--week2', "widget_right-side--morning-temperature2", "widget_right-side--evening-temperature2");
          forecastOnOneDay(fullResult.list[morningHoursIndex + 16], fullResult.list[eveningHoursIndex + 16], 'widget_right-side--week3', "widget_right-side--morning-temperature3", "widget_right-side--evening-temperature3");
      }else{
          alert(xhr.status + ': ' + xhr.statusText);
      }
  }
  xhr.send();
});
