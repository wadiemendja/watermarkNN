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
  textSize(10); // text size px
  text("Daham A", 2, 10); // Text position (x,y) random(10,50)
  fill(255, 165, 0, random(0,255)); // text color RGBA
  saveFrame("data/dahama"+ counter + ".png");
  counter++;
  if (counter < 255) {
    draw();  
  } else {
    exit();
  }
}
