// Initialize Swiper
var mySwiper = new Swiper('main', {
  // Disable touch drag
  touchEventsTarget: 'container',
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
});

// Check if user is on a mobile device
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// If user is not on a mobile device, disable touch drag
if (!isMobile) {
  mySwiper.params.touchMoveStopPropagation = false;
}

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

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  var timeout;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

circleChaptaKaro();


document.querySelectorAll(".elemf").forEach(function (elemf) {
  var rotate = 0;
  var diffrot = 0;

  elemf.addEventListener("mouseleave", function (dets) {
    gsap.to(elemf.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elemf.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elemf.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elemf.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

// Get the root of the document
const root = document.documentElement;

// Easing function
function easeOutQuad(t) {
  return t * (2 - t);
}

// Previous mouse position
let prevX = 0;
let prevY = 0;

// Mouse move event listener
document.addEventListener('mousemove', (e) => {
  // Current mouse position
  const x = e.clientX;
  const y = e.clientY;

  // Calculate eased values
  const easedX = prevX + (x - prevX) * easeOutQuad(0.1);
  const easedY = prevY + (y - prevY) * easeOutQuad(0.1);

  // Update CSS variables
  root.style.setProperty('--x-coordinate', `${easedX}px`);
  root.style.setProperty('--y-coordinate', `${easedY}px`);

  // Update previous mouse position
  prevX = easedX;
  prevY = easedY;
});

let scrollIndex = 0;
let scrollIndexMax = Array.from(document.querySelectorAll('.mainf>.view')).length;
let isScrolling = false;
function scrollDown() {
  if (isScrolling) return;
  isScrolling = true;

  scrollIndex = ++scrollIndex % scrollIndexMax;
  document.querySelector('.mainf').scrollTo({
    left: 0,
    top: scrollIndex * window.innerHeight,
    behavior: 'smooth'
  });


  document.documentElement.style.setProperty('--scroll-index', scrollIndex);
  document.querySelectorAll('.background .view').forEach(view => view.classList.remove('active'));
  document.querySelectorAll('.background .view').forEach(view => view.classList.remove('top-most'));
  document.querySelectorAll('.mainf>.view').forEach(view => view.classList.remove('active'));
  document.querySelector(`.background .view:nth-child(${2 + scrollIndex})`).classList.add('active');
  document.querySelector(`.background .view:nth-child(${2 + scrollIndex})`).classList.add('top-most');
  document.querySelector(`.mainf>.view:nth-child(${2 + scrollIndex})`).classList.add('active');

  setTimeout(() => {
    document.querySelector(`.background .view:nth-child(${2 + scrollIndex})`).classList.remove('active');
  }, 400);
  setTimeout(() => {
    if (scrollIndex == scrollIndexMax - 1) {
      document.querySelector('.mainf').scrollTo({
        left: 0,
        top: 0,
      });
      scrollIndex = 0

      document.querySelector(`.mainf>.view:nth-child(${2 + scrollIndex})`).classList.add('active');
      document.querySelectorAll('.background .view').forEach(view => {
        view.style.transition = 'none';
        document.documentElement.style.setProperty('--scroll-index', scrollIndex);
        requestIdleCallback(() => {
          view.style.transition = 'all var(--background-transition-duration) var(--background-transition-timing-function)';
        }
        );
      });

    }


    isScrolling = false;
  }, 1000);



}

document.addEventListener('click', (e) => {
  scrollDown();
});

setInterval(() => {
  scrollDown();
}, 4000);