var base;
var currentcy = ["EUR", "RON", "USD", "GBP", "RUB", "CAD", "JPY", "BGN", "CHF", "TRY", "HRK", "NOK", "DKK", "CZK", "HUF", "ISK", "PLN", "SEK"];

for(var i=0; i<currentcy.length; i++){
    var option = document.createElement('option');
    option.text = currentcy[i];
    document.getElementById("baseMenu").add(option);
}

if(localStorage.baseStorage){
    base = localStorage.baseStorage;
}else{
    localStorage.baseStorage = "EUR";
    base = "EUR";
}

for(var i=0; i<currentcy.length; i++){
    if(currentcy[i] == base)
    document.getElementById("baseMenu").selectedIndex = i;
}

function setBase(selectedBase){
    base = currentcy[selectedBase];
    localStorage.baseStorage = base;
    location.reload();
}