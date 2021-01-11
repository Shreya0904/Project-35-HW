var dog,happyDog,dogImg;
var database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

dog = createSprite(250,300,150,150);
dog.addImage(dogImg);
dog.scale = 0.15;

feed=createButton("Feed the dog");
  feed.position(1100,390);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(1200,390);
  addFood.mousePressed(addFoods);

textSize(20);
}


function draw() {  
background(46,139,87)
foodObj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed=data.val();
});

fill(255,255,254);
textSize(25);
if(lastFed>=12){
  fill("blue");
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   fill("blue")
   text("Last Feed : 12 AM",350,30);
 }else{
   fill("blue");
   text("Last Feed : "+ lastFed + " AM", 350,30);
}

    drawSprites();

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}