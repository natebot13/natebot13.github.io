var scroller;
var scrollPosition = 0;
var threshold = 1000;
var uid;

$(document).ready(function() {
  scroller = $('.scroller');

  $(document).on('wheel', function(event) {
    updateSlider(event.originalEvent.deltaX);
  });

  for (var i = 20 - 1; i >= 0; i--) {
    var h = 240 + i;
    addPhoto('image' + i, 'https://loremflickr.com/320/' + h);

  }

  db = firebase.database();

});

function addPhoto(id, src) {
  var thing = $('<div>', {
    class: 'scroll-item'
  }).on('wheel', flick).data('key', id).data('offset', 0).append($('<div>', {
    class: 'image'
  }).css('background-image', 'url(' + src + ')'));
  scroller.append(thing);
}


function updateSlider(delta) {
  scrollPosition += -delta;
  scroller.css('left', scrollPosition + 'px');
}

function flick(event) {
  var delta = event.originalEvent.deltaY;
  if (delta > 0) {
    flickUp(event.currentTarget, delta);
  } else {
    flickDown(event.currentTarget, -delta);
  }
}

function flickUp(element, delta) {
  var item = $(element)
  offset = item.data('offset');
  offset -= delta;
  if (Math.abs(offset) > threshold) {
    item.css('width', '0px');
    window.setTimeout(() => item.remove(), 250)
  }
  console.log(offset);
  item.css('transform', 'translateY(' + offset + 'px)');
  item.data('offset', offset);
  console.log(item.data('key'));
  // debugger;
  key = firebase.database().ref().push();
  firebase.database().ref(key).set(item.data('key'));
}

function flickDown(element, delta) {
  var item = $(element)
  offset = item.data('offset');
  offset += delta;
  if (Math.abs(offset) > threshold) {
    item.css('width', '0px');
    window.setTimeout(() => item.remove(), 250)
  }
  item.css('transform', 'translateY(' + offset + 'px)');
  item.data('offset', offset);
  db.ref('photos/' + item.data('key') + '/counter').push();
}