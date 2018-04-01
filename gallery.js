$(document).ready(function() {
  for (var i = 0; i < 20; i++) {
    console.log(i);
    $('.displayPhotos').append($('<div>', {
      class: 'poloroid',
    }).append($('<div>', {
      class: 'image'
    }).css('background-image', 'url(https://loremflickr.com/320/' + 240 + i + ')')));
  }
});
