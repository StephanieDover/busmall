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

try {
  photos = JSON.parse(localStorage.photos);
} catch(error){
  console.log('error retreiveing local storage');
}

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
  photosOnScreen[event.target.id].clicks++;
  displayPhotos();
  clicks++;

  if (clicks === 25) {
    var imagEl = document.getElementById('images');
    imagEl.style.display = 'none';
    var welcome = document.getElementById('welcome');
    welcome.style.display = 'none';
    var restart = document.getElementById('restart');
    restart.style.display = 'block';
    displayChart();
    displayChartTwo();
    getTable();
    try {
      localStorage.photos = JSON.stringify(photos);
    } catch (error) {
      console.log('something went wrong', error);
    }
  }
}

function displayChart() {
  photos = photos.concat(photosOnSecondToLastScreen);
  photos = photos.concat(photosOnScreen);
  photos = photos.concat(photosOnPreviousScreen);
  var chartLabel = [];
  var clicks = [];
  var displays = [];
  for (var i = 0; i <photos.length; i++) {
    chartLabel.push(photos[i].name);
    clicks.push(photos[i].clicks);
    displays.push(photos[i].displayed);
  }

  var canvas = document.getElementById('chart-canvas1');
  var ctx = canvas.getContext('2d');
  var data = {
    labels: chartLabel,
    datasets:[{
      label: 'Clicks',
      backgroundColor:'#42826C',
      borderColor: '#002F32',
      borderWidth: 1,
      data: clicks},
    {
      label: 'Displayed',
      backgroundColor: '#A5C77F',
      borderColor: '#002F32',
      borderWidth: 1,
      data: displays,}
    ]
  };
  canvas.height = '500';
  canvas.width = '500';
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
  });
}
function displayChartTwo() {
  var chartLabel = [];
  var percent= [];
  for (var i = 0; i <photos.length; i++) {
    chartLabel.push(photos[i].name);
    percent.push(Math.floor((photos[i].clicks/photos[i].displayed)*100));
  }
  var canvas = document.getElementById('chart-canvas2');
  var ctx = canvas.getContext('2d');
  Chart.defaults.global.defaultFontColor = '#000000';
  var data = {
    labels: chartLabel,
    datasets:[{
      label: '% of Clicks when Viewed',
      backgroundColor:'#002F32',
      borderColor: '#42826C',
      borderWidth: 1,
      data: percent,}
    ]
  };
  canvas.height = '500';
  canvas.width = '500';
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
  });
}
//table to display data




function getTable(){

  var result = document.getElementById('table-data');
  var table = document.createElement('table');
  table.id = table;
  var titleRow = document.createElement('tr');
  var titleItem = document.createElement('th');
  titleItem.textContent = 'Item';
  var titleViews = document.createElement('th');
  titleViews.textContent = 'Views';
  var titleClicks = document.createElement('th');
  titleClicks.textContent = 'Clicks';
  var titlePercetage = document.createElement('th');
  titlePercetage.textContent = '% of Clicks When Viewed';
  var titleRecomended = document.createElement('th');
  titleRecomended.textContent = 'Recomended';
  result.appendChild(table);
  table.appendChild(titleItem);
  table.appendChild(titleViews);
  table.appendChild(titleClicks);
  table.appendChild(titlePercetage);
  table.appendChild(titleRecomended);

  for (var i = 0; i < photos.length; i++) {

    var row = document.createElement('tr');
    titleRow.appendChild(row);
    var item = document.createElement('td');
    item.textContent = photos[i].name;
    var views = document.createElement('td');
    views.textContent = photos[i].displayed;
    var clicks = document.createElement('td');
    clicks.textContent = photos[i].clicks;
    var percetage = document.createElement('td');
    percetage.textContent = ((photos[i].clicks/photos[i].displayed)*100).toFixed(0);
    table.appendChild(row);
    table.appendChild(item);
    table.appendChild(views);
    table.appendChild(clicks);
    table.appendChild(percetage);

    if (((photos[i].clicks/photos[i].displayed)*100).toFixed(0) > 30){
      var recomended = document.createElement('td');
      recomended.textContent = 'Yes';
      table.appendChild(recomended);
    } else {
      recomended = document.createElement('td');
      recomended.textContent = 'No';
      table.appendChild(recomended);
    }
  }
}

displayPhotos();
function refreshWindow(event){
  window.location.reload();
  }
var imageClick = document.getElementById('images');
imageClick.addEventListener('click', photoSelector);
var refresh = document.getElementById('restart');
refresh.addEventListener('click', refreshWindow);
