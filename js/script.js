var peoples = [
  'Tom',
  'Ant',
  'Jamin',
  'Charlie',
  'CJ'
];

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
};

$(function() {

  var clock = new FlipClock($('#clock'), null, {
    clockFace: 'TwelveHourClock'
  });

  updateTrash();
  setInterval(updateTrash, 6*60*60*1000);

  updateForecast();
  setInterval(updateForecast, 15*60*1000);

});

function updateTrash() {
  var today = new Date();
  var week = today.getWeek();

  $('.trash-duty-name').html( peoples[week%5] );
}

function updateForecast() {
  var forecast_iframe = document.getElementById('forecast_embed');
  var base_url = "http://forecast.io/embed/";
  var rand_param = "?random=" + Math.floor(Math.random()*11);
  var api_opts = "#lat=40.704536&lon=-73.986536&name=DUMBO";
  forecast_iframe.src = base_url + rand_param + api_opts;
}
;
