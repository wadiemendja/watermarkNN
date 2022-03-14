int counter = 0 ;
PFont myFont;
String [][] watermarks = {{"Wadie Mendja", "wadiemendja"},{"Zeghamri Salah","zeghamris"},{"Daham A", "dahama"}};

void setup () {
  size(64, 64); // window size
  myFont = createFont("Georgia", 5);
  textFont(myFont);
}

void draw () {
  float r = random(0, 255);
  float g = random(0, 255);
  float b = random(0, 255);
  if(counter == 0) background(0);
  else background(r,g,b);
  // rotate(random(-0.5, 0.5));
  textSize(8); // text size px
  float alpha = 25.5; // random(25.5);
  for(int i=0; i<watermarks.length; i++) {
    text(watermarks[i][0], 2, 10); // Text position (x,y) random(10,50)
    fill(255, 165, 0, alpha); // text color RGBA 25.5 = 0.1 alpha
    saveFrame("data/" + watermarks[i][1] + counter + ".png");
    if(counter == 0) background(0);
    else background(r,g,b); // clearing frame
  }
  counter++;
  if (counter < 100) {
    draw();  
  } else {
    exit();
  }
}
