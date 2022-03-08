let wadieExamples = [];
let dahamExamples = [];
let zeghamriExamples = [];
let watermarkClassifier;
const trainBtn = document.getElementById('trainBtn');

function preload() {
   for (let i = 0; i < 10; i++) {
      wadieExamples[i] = loadImage(`../example_generator/sketch_220224a/data/wadiemendja${i}.png`);
      dahamExamples[i] = loadImage(`../example_generator/sketch_220224a/data/dahama${i}.png`);
      zeghamriExamples[i] = loadImage(`../example_generator/sketch_220224a/data/zeghamris${i}.png`);
   }
}

function setup() { }

trainBtn.addEventListener('click', () => {
   trainBtn.disabled = true;
   console.log("Training started !");
   setTimeout(train, 100);
});

function train() {
   watermarkClassifier = ml5.neuralNetwork({
      inputs: [64, 64, 4],
      task: "imageClassification",
      debug: true
   });
   for (let i = 0; i < wadieExamples.length; i++) {
      watermarkClassifier.addData({ image: wadieExamples[i] }, { label: "Wadie Mendja" });
      watermarkClassifier.addData({ image: dahamExamples[i] }, { label: "Daham A" });
      watermarkClassifier.addData({ image: zeghamriExamples[i] }, { label: "Zeghamri Salah" });
   }
   watermarkClassifier.normalizeData();
   watermarkClassifier.train({ epochs: 10 }, () => {
      // watermarkClassifier.save();
      console.log("Finished training");
   });
   trainBtn.disabled = false;
}