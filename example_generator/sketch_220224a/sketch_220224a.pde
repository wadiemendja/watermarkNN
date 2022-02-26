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
  // rotate(random(-0.5, 0.5));
  textSize(10); // text size px
  text("Zeghamri Salah", 2, 10); // Text position (x,y)
  fill(255, 165, 0, 25.5); // text color RGBA
  saveFrame("data/zeghamris"+ counter + ".png");
  counter++;
  if (counter < 255) {
    draw();  
  } else {
    exit();
  }
}
