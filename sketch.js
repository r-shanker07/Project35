//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogIMG, dogIMG2
var fedTime = 0;
var lastFed = 0;

function preload()
{
  //load images here
  dogIMG = loadImage("images/dogIMG.png")
  dogIMG2 = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database()

  dog = createSprite(250,250,40,40)
  dog.addImage(dogIMG)
  
  foodStock=database.ref('food')
    foodStock.on("value", readStock)

  foodObj = new Food()
}


function draw() {  
  background(46,139,87)

  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30)
  }else if(lastFed===0){
    text("Last Feed : 12 AM",350,30)
  }else{
    text("Last Feed : "+ lastFed + "AM",350,30)
  }

  fedTime=database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed=data.val()
  })

  foodObj.display()
  drawSprites();
  
  textSize(20)
  fill("white")
  stroke()
  //add styles here

}

function readStock(data){
  foodS=data.val()
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
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



