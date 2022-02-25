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
  background(r,g,b); // frame background
  textSize(10); // text size px
  text("Wadie Mendja", 2, 10); // Text position (x,y)
  fill(255, 165, 0, 25.5); // text color RGBA
  saveFrame("data/example"+ counter + ".png");
  counter++;
  if (counter < 255) {
    draw();  
  } else {
    exit();
  }
}
