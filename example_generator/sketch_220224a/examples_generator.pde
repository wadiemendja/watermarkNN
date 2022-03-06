int counter = 0 ;
PFont myFont;

void setup () {
  size(64, 64); // window size
  myFont = createFont("Georgia", 5);
  textFont(myFont);
}

void draw () {
  float r = random(0, 255);
  float g = random(0, 255);
  float b = random(0, 255);
  background(0); // frame background
  // rotate(random(-0.5, 0.5));
  textSize(8); // text size px
  text("Daham A", 2, 10); // Text position (x,y) random(10,50)
  fill(255, 165, 0, random(20, 80)); // text color RGBA 25.5 = 0.1 alpha
  saveFrame("data/dahama"+ counter + ".png");
  counter++;
  if (counter < 100) {
    draw();  
  } else {
    exit();
  }
}
