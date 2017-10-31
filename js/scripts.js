var xhr = new Fetch();
var params = 'city=' + encodeURIComponent(city);

xhr.open('GET', 'api.openweathermap.org/data/2.5/weather?q=' + params, false);
xhr.onreadystatechange = function(){
    if(xhr.status == 200){
        return xhr.responseText;
    }else{
        return xhr.status + ': ' + xhr.statusText;
    }
}
xhr.send();

var resultOfResponse = document.getElementsByClassName("widget_left-side--city-name");
var textOfResponse = document.getElementsByClassName("widget_input--input-search");

resultOfResponse.innerHTML = textOfResponse.value;