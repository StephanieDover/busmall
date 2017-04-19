'use strict';

function Product(name, filePath, imageId) {
  this.name = name ;
  this.filePath= filePath;
  this.imageId = imageId;
  this.displayed = 0;
  this.clicks = 0;
}

var photosOnSecondToLastScreen = [];
var photosOnPreviousScreen = [];
var photosOnScreen = [];

var bag =  new Product('Bag','img/bag.jpg');
var banana =  new Product('Banana Cutter', 'img/banana.jpg');
var bathroom =  new Product ('Tablet Holder for Bathroom', 'img/bathroom.jpg');
var boots =  new Product('Boots', 'img/boots.jpg');
var breakfast =  new Product('breakfast', 'img/breakfast.jpg');
var bubblegum =  new Product('Bubble Gum', 'img/bubblegum.jpg');
var chair =  new Product ('Comfy Chair', 'img/chair.jpg');
var cthulhu =  new Product('Cthulhu centerpeice', 'img/cthulhu.jpg');
var duckDog =  new Product('duck dog', 'img/dog-duck.jpg');
var dragon =  new Product ('Dragon', 'img/dragon.jpg');
var pen =  new Product('pen', 'img/pen.jpg');
var broomDog =  new Product('Broom Dog', 'img/pet-sweep.jpg');
var scissors =  new Product('scissors', 'img/scissors.jpg');
var shark =  new Product('Shark', 'img/shark.jpg');
var broomBaby =  new Product ('Broom Baby', 'img/sweep.png');
var tauntaun =  new Product ('tauntaun', 'img/tauntaun.jpg');
var unicorn =  new Product ('unicorn', 'img/unicorn.jpg');
var usb =  new Product ('USB', 'img/usb.gif');
var watering =  new Product ('Watering Can', 'img/water-can.jpg');
var wine =  new Product ('Wine Glass', 'img/wine-glass.jpg');

var photos = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, duckDog, dragon, pen, broomDog, scissors, shark, broomBaby, tauntaun, unicorn, usb, watering, wine ];

var clicks = 0;
var getRandomIndex = function() {
  return  Math.floor(Math.random()* photos.length);
};
function displayPhotos() {
  var el ;

  photos = photos.concat(photosOnSecondToLastScreen);
  photosOnSecondToLastScreen = photosOnPreviousScreen;
  photosOnPreviousScreen = photosOnScreen;
  photosOnScreen = [];
  for (var i = 0; i < 3; i++) {
    var nextPhoto = photos.splice(getRandomIndex(photos), 1);
    photosOnScreen = photosOnScreen.concat(nextPhoto);
    el = document.getElementById('' + i);

    el.src = nextPhoto[0].filePath;
    nextPhoto[0].displayed++;
  }
}
function photoSelector(event) {
  console.log(event.target.id)
  photosOnScreen[event.target.id].clicks++
  console.log(photosOnScreen[event.target.id].clicks)
  displayPhotos();
  clicks++;


}

function displayChart() {
  if (clicks === 25) {
    var canvas = document.getElementById('chart-canvas');
    var ctx = canvas.getContext('2d');
    var data = {
      labels: ['bag', 'banana', 'bathroom', 'boots','breakfast', 'bubblegum', 'chair', 'cthulhu', 'duckDog', 'dragon', 'pen', 'broomDog', 'scissors', 'shark', 'broomBaby', 'tauntaun', 'unicorn', 'usb', 'watering', 'wine' ],
      datasets:[{
        label: 'Displayed',
        backgroundColor: [
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030',
          '#703030'
        ],
        borderWidth: 1,
        data: [bag.displayed, banana.displayed, bathroom.displayed, boots.displayed, breakfast.displayed, bubblegum.displayed, chair.displayed, cthulhu.displayed, duckDog.displayed, dragon.displayed, pen.displayed, broomDog.displayed, scissors.displayed, shark.displayed, broomBaby.displayed, tauntaun.displayed, unicorn.displayed, usb.displayed, watering.displayed, wine.displayed ]},
        {
          label: 'Clicks',
          backgroundColor: [
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B',
            '#2F343B'
          ],
          borderWidth: 1,
          data: [bag.clicks, banana.clicks, bathroom.clicks, boots.clicks, breakfast.clicks, bubblegum.clicks, chair.clicks, cthulhu.clicks, duckDog.clicks, dragon.clicks, pen.clicks, broomDog.clicks, scissors.clicks, shark.clicks, broomBaby.clicks, tauntaun.clicks, unicorn.clicks, usb.clicks, watering.clicks, wine.clicks ] }]
        };
        canvas.height = '25%';
        canvas.width = '25%';
        var myBarChart = new Chart(ctx, {
          type: 'bar',
          data: data,
        });
      }
    };
    displayPhotos();
    displayChart();

    var imageClick = document.getElementById('images');
    // var imageClickCounter = document.getElementById('')
    imageClick.addEventListener('click', photoSelector);
