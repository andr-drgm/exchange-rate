
var table = document.getElementById("myTable");
var url = "https://api.exchangeratesapi.io/";

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // Begin accessing JSON data here
        var data = JSON.parse(this.responseText);
        compareValues(data);
        //Urmeaza sa fac o functie care arata cum a evoluat pretul de ieri pana azi
        //O functie care returneaza data de ieri in format 2019-04-11
    }
};
xmlhttp.open("GET", url + 'latest?base=' + base, true);
xmlhttp.send();

var compareValues = function (today) {
    console.log(getYesterday(today.date));
    var yesterdayDate = getYesterday(today.date).getFullYear() + '-' + getYesterday(today.date).getMonth() + '-' + getYesterday(today.date).getDate();
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Begin accessing JSON data here
            var yesterdayData = JSON.parse(this.responseText);
            var table = document.getElementById("myTable");
            for (var i = 0; i < currentcy.length; i++) {
                var row = table.insertRow(table.rows.length);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = currentcy[i];
                if (today.rates[currentcy[i]] != undefined)
                    cell2.innerHTML = today.rates[currentcy[i]];
                else cell2.innerHTML = 1;
                if (today.rates[currentcy[i]] > yesterdayData.rates[currentcy[i]]) {
                    cell2.style.color = "green";
                    cell3.style.color = "green";
                    cell3.innerHTML = "&#8599;";
                }
                else if (today.rates[currentcy[i]] < yesterdayData.rates[currentcy[i]]) {
                    cell2.style.color = "red";
                    cell3.style.color = "red";
                    cell3.innerHTML = "&#8600;";
                }
                else if (today.rates[currentcy[i]] == yesterdayData.rates[currentcy[i]]) {
                    cell3.innerHTML = "-";
                }
            }
            //Urmeaza sa fac o functie care arata cum a evoluat pretul de ieri pana azi
            //O functie care returneaza data de ieri in format 2019-04-11
        }
    };
    xmlhttp.open("GET", url + yesterdayDate + '?base=' + base, true);
    xmlhttp.send();
}

var getYesterday = function (date1) {
    var dt = new Date(date1);
    return new Date((dt.setDate(dt.getDate() - 1)));
}