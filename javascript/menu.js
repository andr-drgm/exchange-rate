(function(){
    var menu = document.querySelector('ul'),
        menulink = document.querySelector('i');
    menulink.addEventListener('click', function(e){
         menu.classList.toggle('active');
         e.preventDefault();
    });
})();

function toggleMenu(){
    console.log("merge");
    document.querySelector('ul').classList.toggle('active');
}

window.onscroll = function() {myFunction()};

var header = document.getElementById("avatar");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}