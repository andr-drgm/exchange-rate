var url = "https://api.exchangeratesapi.io/";

var data;
var graphBase;

window.onload = function () {

    document.getElementsByClassName("content").innerHTML = "LOADING";

    initializeGraphSelector();

    document.getElementById("title").innerHTML = base + '/' + graphBase + " în ultimele 12 luni";

    data = getData('https://api.exchangeratesapi.io/latest?base=' + base);

    var today = data.date;
    console.log(today);

    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: base + '/' + graphBase
        },
        axisY: {
            includeZero: false
        },
        data: [{
            type: "line",
            dataPoints: dps
        }]
    });

    var xVal = 1;
    var yVal;
    var dataLength = 12; // number of dataPoints visible at any point

    for (var j = 0; j < dataLength; j++) {
        var anotherDate = lastMounth(today, 11 - j).getFullYear() + '-' + lastMounth(today, 11 - j).getMonth() + '-' + lastMounth(today, 11 - j).getDate();
        console.log(anotherDate);
        data = getData('https://api.exchangeratesapi.io/' + anotherDate +  '?base=' + base);
        yVal = data.rates[graphBase];
        // xVal = 1;
        // console.log('xVal ' + xVal);
        dps.push({
            x: xVal,
            y: yVal
        });
        xVal++;
    }

    if (dps.length > dataLength) {
        dps.shift();
    }

    chart.render();

}

var getData = function (url) {
    var resp;
    var xmlHttp;

    resp = '';
    xmlHttp = new XMLHttpRequest();

    if (xmlHttp != null) {
        xmlHttp.open("GET", url, false);
        xmlHttp.send(null);
        resp = xmlHttp.responseText;
    }

    return JSON.parse(resp);
}

var lastMounth = function (date1, count) {
    var dt = new Date(date1);
    if(dt.getMonth() - count != 0)
        return new Date((dt.setMonth(dt.getMonth() - count)));
    else {
        dt.setFullYear(dt.getFullYear() - 1);
        dt.setMonth(11);
        dt.setDate(30);
        return dt;
    } 
}

var initializeGraphSelector = function(){
    for(var i=0; i<currentcy.length; i++){
        var option = document.createElement('option');
        option.text = currentcy[i];
        document.getElementById("baseMenu2").add(option);
    }
    
    if(localStorage.graphBaseStorage){
        graphBase = localStorage.graphBaseStorage;
    }else{
        localStorage.graphBaseStorage = "RON";
        graphBase = "RON";
    }
    
    for(var i=0; i<currentcy.length; i++){
        if(currentcy[i] == graphBase)
        document.getElementById("baseMenu2").selectedIndex = i;
    }
}

function setBase2(selectedBase){
    graphBase = currentcy[selectedBase];
    localStorage.graphBaseStorage = graphBase;
    location.reload();
}