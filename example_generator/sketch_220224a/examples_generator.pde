int counter = 0 ;

void setup () {
  size(64, 64); // window size
}

float randomizeColor(){
  return random(0, 255);
}

void draw () {
  float r = randomizeColor();
  float g = randomizeColor();
  float b = randomizeColor();
  background(0); // frame background
  // rotate(random(-0.5, 0.5));
  textSize(random(8,10)); // text size px
  text("Wadie Mendja", 2, 10); // Text position (x,y) random(10,50)
  fill(255, 165, 0, random(20,30)); // text color RGBA 25.5 = 0.1 alpha
  saveFrame("data/wadiemendja"+ counter + ".png");
  counter++;
  if (counter < 100) {
    draw();  
  } else {
    exit();
  }
}
