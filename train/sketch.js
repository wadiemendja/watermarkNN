let wadieExample = [];
let dahamExamples = [];
let watermarkClassifier;

function preload() {
   for (let i = 0; i < 255; i++) {
      wadieExample[i] = loadImage(`../example_generator/sketch_220224a/data/wadiemendja${i}.png`);
      dahamExamples[i] = loadImage(`../example_generator/sketch_220224a/data/dahama${i}.png`);
   }
}

function setup() {
   createCanvas(400, 400);
   watermarkClassifier = ml5.neuralNetwork({
      input: [64, 64, 4],
      task: "imageClassification",
      debug: true
   });
   for (let i = 0; i < wadieExample.length; i++) {
      watermarkClassifier.addData({ image: wadieExample[i] }, { label: "Wadie Mendja" });
      watermarkClassifier.addData({ image: dahamExamples[i] }, { label: "Daham A" });
   }
   watermarkClassifier.normalizeData();
   watermarkClassifier.train({ epochs: 50 }, () => console.log("Finished training"));
}