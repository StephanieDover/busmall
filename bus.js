'use strict';

function Product(name, filePath) {
  this.name = name ;
  this.filePath= filePath;
  this.shows = 0;
  this.clicks = 0;
}

var bag = new Product('Bag','img/bag.jpg');
var banana = new Product('Banana Cutter', 'img/banana.jpg');
var bathroom = new Product ('Tablet Holder for Bathroom', 'img/bathroom.jpg');
var boot = new Product('Boots', 'img/boots.jpg');
var breakfast = new Product('breakfast', 'img/breakfast.jpg');
var bubblegum = new Product('Bubble Gum', 'img/bubblegum.jpg');
var chair = new Product ('Comfy Chair', 'img/chair.jpg');
var cthulhu = new Product('Cthulhu centerpeice', 'img/cthulhu.jpg');
var duck = new Product('duck dog', 'img/dog-duck.jpg');
var dragon = new Product ('Dragon', 'img/dragon.jpg');
var pen = new Product('pen', 'img/pen.jpg');
var sweepPet = new Product('Broom Dog', 'img/pet-sweep.jpg');
var scissors = new Product('scissors', 'img/scissors.jpg');
var shark = new Product('Shark', 'img/shark.jpg');
var sweepBaby = new Product ('Broom Baby', 'img/sweep.png');
var tauntaun = new Product ('tauntaun', 'img/tauntaun.jpg');
var unicorn = new Product ('unicorn', 'img/unicorn.jpg');
var usb = new Product ('USB', 'img/usb.gif');
var watering = new Product ('Watering Can', 'img/water-can.jpg');
var wine = new Product ('Wine Glass', 'img/wine-glass.jpg');

var productsArray = [bag, banana, bathroom, boot, breakfast, bubblegum, chair, cthulhu, duck, dragon, pen, sweepPet, scissors, shark, sweepBaby, tauntaun, unicorn, usb, watering, wine];

var displayProduct = function(){
  for ( var productLoop = 0; productLoop < 1; productLoop++) {
    var randomNum = Math.floor(Math.random()* productsArray.length);

    var el = document.getElementById('img-1');
    var image = document.createElement('img');
    image.src = productsArray[randomNum].filePath;
    el.appendChild(image);

    do {
      var randomNumTwo = Math.floor(Math.random()* productsArray.length);
    } while ( randomNumTwo === randomNum);
    el = document.getElementById('img-2');
    image = document.createElement('img');
    image.src = productsArray[randomNumTwo].filePath;
    el.appendChild(image);

    do {
      var randomNumThree = Math.floor(Math.random()* productsArray.length);
    } while ( randomNumTwo === randomNumThree || randomNumThree === randomNum);
    el = document.getElementById('img-3');
    image = document.createElement('img');
    image.src = productsArray[randomNumThree].filePath;
    el.appendChild(image);


    console.log(productsArray[productLoop].filePath);

  }
};
displayProduct();
