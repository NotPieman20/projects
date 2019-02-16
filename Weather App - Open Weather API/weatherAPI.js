var $ = function(id) {
  return document.getElementById(id);
};

function getHTTPObject() {
  var xhr = false;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        xhr = false;
      }
    }
  }
  return xhr;
}

function grabFile() {
  var request = getHTTPObject();
  if (request) {
    request.onreadystatechange = function() {
      parseResponse(request);
    };
    var loc = $("location").value;
    request.open("GET", "http://api.openweathermap.org/data/2.5/forecast/daily?q="+ loc +"&mode=xml&units=metric&cnt=5&APPID=a0e5dbf10fd19fe6df49c7038de63a06", true);
    request.send(null);
  }
}


function parseResponse(request){
  if(request.readyState == 4){
    if(request.status == 200 || request.status == 304){
      var details = document.getElementById("weather");

      var data = request.responseXML;
      var location = data.getElementsByTagName('name')[0].firstChild.nodeValue;
      var country = data.getElementsByTagName('country')[0].firstChild.nodeValue;
      if(country=='IE'){
        country = 'Ireland';
      }
      if(country == 'GB'){
        country = 'United Kingdom';
      }
      if(country == 'US'){
        country = 'United States';
      }

      var day1 = data.getElementsByTagName('symbol')[0];
      var type1n = day1.getAttributeNode('name').value;
      var day2 = data.getElementsByTagName('symbol')[1];
      var type2 = day2.getAttributeNode('name').value;
      var day3 = data.getElementsByTagName('symbol')[2];
      var type3 = day1.getAttributeNode('name').value;
      var day4 = data.getElementsByTagName('symbol')[3];
      var type4 = day1.getAttributeNode('name').value;
      var day5 = data.getElementsByTagName('symbol')[4];
      var type5 = day1.getAttributeNode('name').value;

      var day1Clouds = data.getElementsByTagName('clouds')[0];
      var type1Cloudsx = day1Clouds.getAttributeNode('value').value;
      var day2Clouds = data.getElementsByTagName('clouds')[1];
      var type2Clouds = day2Clouds.getAttributeNode('value').value;
      var day3Clouds = data.getElementsByTagName('clouds')[2];
      var type3Clouds = day1Clouds.getAttributeNode('value').value;
      var day4Clouds = data.getElementsByTagName('clouds')[3];
      var type4Clouds = day1Clouds.getAttributeNode('value').value;
      var day5Clouds = data.getElementsByTagName('clouds')[2];
      var type5Clouds = day1Clouds.getAttributeNode('value').value;

      var day = [];
      var type1 =[];
      var type1t =[];
      var type1Ma = [];
      var type1Min = [];
      var type1Clouds = [];
      var type1Wind = [];
      var days = data.getElementsByTagName('time');
      var day1 = data.getElementsByTagName('symbol');
      var day1t = data.getElementsByTagName('temperature');
      var day1Ma = data.getElementsByTagName('temperature');
      var day1Min = data.getElementsByTagName('temperature');
      var day1Clouds = data.getElementsByTagName('clouds');
      var day1Wind = data.getElementsByTagName('windSpeed');
      for(i=0; i<day1.length;i++){
        day.push(days[i].getAttributeNode('day').value)
        type1.push( day1[i].getAttributeNode('name').value)
        type1t.push(day1t[i].getAttributeNode('day').value)
        type1Ma.push(day1Ma[i].getAttributeNode('max').value)
        type1Min.push(day1Min[i].getAttributeNode('min').value)
        type1Clouds.push(day1Clouds[i].getAttributeNode('value').value)
        type1Wind.push(day1Wind[i].getAttributeNode('mps').value)
      }

      var cur = type1t.toString();
      var mmax = type1Ma.toString();
      var mmin = type1Min.toString();
      var wSpeed = type1Wind.toString();

      var newCur = cur.split(',').map(Number);
      var newMax = mmax.split(',').map(Number);
      var newMin = mmin.split(',').map(Number);
      var newWind = wSpeed.split(',').map(Number);

      var ctx = document.getElementById('myChart').getContext('2d');
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: day,
          datasets: [{
            label: 'Current',
            data: newCur,
            backgroundColor: "rgba(153,255,51,0.4)",
            pointBackgroundColor: "#80b6f4",
          }, {
            label: 'Max',
            data: newMax,
            backgroundColor: "rgba(255,0,255,0.4)"
          }, {
          label: 'Min',
          data: newMin,
          backgroundColor: "rgba(255,153,0,0.4)"
        }]
      },
      options:{
        maintainAspectRatio: true,
          bezierCurve : false,
          responsive: false,
        title:{
          display: true,
          text: 'Temperatures'
        }
      }
      });

      var ctx = document.getElementById('pieChart').getContext('2d');
      var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: day,
      datasets: [{
        backgroundColor: [
          "#2ecc71",
          "#3498db",
          "#95a5a6",
          "#9b59b6",
          "#f1c40f",
          "#e74c3c",
          "#34495e"
        ],
        hoverBackgroundColor:[
          "white",
          "white",
          "white",
          "white",
          "white"
        ],
        hoverBorderColor:[
          "grey",
          "grey",
          "grey",
          "grey",
          "grey"
        ],
        data: newWind
      }]
    },
    options:{
      animateScale: true,
      maintainAspectRatio: true,
        bezierCurve : false,
        responsive: false,
      title:{
        display: true,
        text: "Wind Speed in MPS"
      },
      tooltips:{
        bodyFontFamily: 'Arial',
        bodyFontStyle: 'bold'
      }
    }
  });

      var html = "<h4>Conditions in "+ location+ ", " +country+"</h4>" +
        "<table class='table table-striped'><tr><th>Today</th><th>Tomorrow</th>"+
        "<th>Day 3</th><th>Day 4</th><th>Day 5</th></tr><tr><td>" + type1n + "</td>"+
        "<td>" + type2 + "</td><td>" + type3 + "</td><td>" + type4 + "</td><td>"+ type5 +"</td></tr></table>"

      var html3 = "<h4>Clouds</h4>" +
      "<table class='table table-striped'><tr><th>Today</th><th>Tomorrow</th>"+
      "<th>Day 3</th><th>Day 4</th><th>Day 5</th></tr><tr><td>" + type1Cloudsx + "</td>"+
          "<td>" + type2Clouds + "</td><td>" + type3Clouds + "</td><td>" + type4Clouds + "</td><td>"+ type5Clouds +"</td></tr></table>"

      $("weather").innerHTML = html;
      $("clouds").innerHTML = html3;
      $("headCard").innerHTML = location;
      $("countryCard").innerHTML = country;
      $("tempCard").innerHTML = newCur[0];
      $("tomoCard").innerHTML = newCur[1];
      $("day3Card").innerHTML = newCur[2];
    }
  }
}
// purpose was to show the card div that was set to hidden on click of this button, couldnt get it to work
function showDiv() {
   document.getElementById('toggle').style.display = '';
}

  window.onload = function(){
    $("search").onclick = grabFile;
  }
