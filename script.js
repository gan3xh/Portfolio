
const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

function circleMouseFollower() {
  var minicircle = document.querySelector("#minicircle");
  minicircle.style.pointerEvents = "none";
  window.addEventListener("mousemove", function (dets) {
    minicircle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
  });
}



function page3Animation() {
  var elemC = document.querySelector("#elem-container");
  var fixed = document.querySelector("#fixed-image");
  var timer;

  elemC.addEventListener("mouseenter", function () {
    clearTimeout(timer); // clear any existing timer
    fixed.style.display = "block";
  });

  elemC.addEventListener("mouseleave", function () {
    timer = setTimeout(function () { // set a delay before hiding the image
      fixed.style.display = "none";
    }, 300); // delay in milliseconds
  });

  var elems = document.querySelectorAll(".elem");
  elems.forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      var image = e.getAttribute("data-image");
      fixed.style.backgroundImage = `url(${image})`;
    });
  });
}


function loaderAnimation() {
  var loader = document.querySelector("#loader")
  setTimeout(function () {
      loader.style.top = "-100%"
  }, 4200)
}

page3Animation()
loaderAnimation()
circleMouseFollower()