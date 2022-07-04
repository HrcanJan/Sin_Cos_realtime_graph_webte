var X = [0];
var Y1 = [0];
var Y2 = [1];

var prevX = [];
var prevY1 = [];
var prevY2 = [];

var line1, line2, data;
var lineX, lineY1, lineY2;

var sinDraw = true;
var cosDraw = true;
var run = true;
var customNum = true;

var amp = 1;

if(typeof(EventSource) !== "undefined") {
  var source = new EventSource("https://iolab.sk/evaluation/sse/sse.php");
  source.addEventListener("message", function(e)
  {
    var data = JSON.parse(e.data);
    document.getElementById("result").innerHTML = e.data;
    listenerEvent(data);
  });
}
else {
  document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events.";
}

function action(){
  if(run == true){
    run = false;
    stopLoading();
    document.getElementById("but").value = "Start";
  }
  else {
    run = true;
    document.getElementById("but").value = "Stop";
  }
}

function stopLoading(){
  prevX = X.slice();
  prevY1 = Y1.slice();
  prevY2 = Y2.slice();
}


function drawSin(){
  if(sinDraw == true)
    sinDraw = false;
  else
    sinDraw = true;

  myCanvas();
}

function drawCos(){
  if(cosDraw == true)
    cosDraw = false;
  else
    cosDraw = true;

  myCanvas();
}

function listenerEvent(data){

  if(data.x == 0){
    Y1[0] = data.y1 * amp;
    Y2[0] = data.y2 * amp;
  }
  else{
    X.push(data.x);
    Y1.push(data.y1 * amp);
    Y2.push(data.y2 * amp);
  }

  if(run == true)
    myCanvas();
}

function myCanvas(){
  if(run == true){
    lineX = X;
    lineY1 = Y1;
    lineY2 = Y2;
  } 
  else{
    lineX = prevX;
    lineY1 = prevY1;
    lineY2 = prevY2;
  }

  line1 = {
    x: lineX,
    y: lineY1,
    type: 'line',
    name: 'Sin',
    line: {
      color: 'rgb(164, 194, 244)',
      width: 3
    }
  };

  line2 = {
    x: lineX,
    y: lineY2,
    type: 'line',
    name: 'Cos',
    line: {
      color: 'rgb(255, 217, 102)',
      width: 3
    }
  };

  data = [line1, line2]; 

  var layout = {
    title: 'Plotly Graph',
    showlegend: true,
  };

  Plotly.newPlot(graphDiv, [], layout);

  if(sinDraw == true && cosDraw == false)
    data.splice(1, 1);

  else if(sinDraw == false && cosDraw == true)
    data.splice(0, 1);

  if(sinDraw == true || cosDraw == true)
    Plotly.addTraces(graphDiv, data);  
}

function optionBox(){
  var dot1 = document.getElementById('dot1');
  var dot2 = document.getElementById('dot2');

  dot1.onchange = function() {  
      document.getElementById("h-slider").style.display = 'none';
      document.getElementById("h-num").style.display = 'block';
  };
  dot2.onchange = function() {  
      document.getElementById("h-slider").style.display = 'block';
      document.getElementById("h-num").style.display = 'none';
  };  
}

this.addEventListener('update-amplitude', (event) => {
  if(event.detail.value >= 1 && event.detail.value <= 5)
    amp = event.detail.value;
})