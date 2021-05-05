// animejs for intro animation

var pathEls = document.querySelectorAll('path');
for (var i = 0; i < pathEls.length; i++) {
  var pathEl = pathEls[i];
  var offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute('stroke-dashoffset', offset);
  anime({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: anime.random(1000, 3000),
    delay: anime.random(0, 2000),
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine',
    autoplay: true,
  });
}

// magnet mouse
let mm = new MagnetMouse({
  magnet: {
    element: '.magnet',
    position: 'center',
  },
});

mm.init();

let mm2 = new MagnetMouse({
  magnet: {
    element: '.glue',
    position: 'center',

    distance: 0,
  },
});

mm2.init();

let mm3 = new MagnetMouse({
  magnet: {
    element: '.section_services__circle-inner',
    position: 'buttom',
    distance: 20,
  },
  inCallback: function (data) {
    const node = data.elem.node.nextElementSibling;
    node.style.opacity = '1';
  },
  outCallback: function (data) {
    const node = data.elem.node.nextElementSibling;
    node.style.opacity = '0';
  },
});

mm3.init();

// smoth scroll
const navIcon = document.querySelector('#navigator-magnet');
navIcon.addEventListener('click', () => window.scrollTo(0, innerHeight));
