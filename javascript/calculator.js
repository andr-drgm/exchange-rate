var data;
var calculatorBase;

window.onload = function () {
    initializeCalculatorSelector();
    data = getData('https://api.exchangeratesapi.io/latest?base=' + base);
    var value = document.getElementById('inputValue').value;
    if(value < 0){
        value = -value;
        document.getElementById('inputValue').value = value;
    }
    document.getElementById('result').innerHTML = value * data.rates[calculatorBase] + " " + calculatorBase;

}

var valueCalculator = function(){
    var value = document.getElementById('inputValue').value;
    if(value < 0){
        value = -value;
        document.getElementById('inputValue').value = value;
    }
    document.getElementById('result').innerHTML = value * data.rates[calculatorBase] + " " + calculatorBase;
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

var initializeCalculatorSelector = function(){
    for(var i=0; i<currentcy.length; i++){
        var option = document.createElement('option');
        option.text = currentcy[i];
        document.getElementById("baseMenu2").add(option);
    }
    
    if(localStorage.calculatorBaseStorage){
        calculatorBase = localStorage.calculatorBaseStorage;
    }else{
        localStorage.calculatorBaseStorage = "RON";
        calculatorBase = "RON";
    }
    
    for(var i=0; i<currentcy.length; i++){
        if(currentcy[i] == calculatorBase)
        document.getElementById("baseMenu2").selectedIndex = i;
    }
}

function setBase2(selectedBase){
    calculatorBase = currentcy[selectedBase];
    localStorage.calculatorBaseStorage = calculatorBase;
    valueCalculator();
}