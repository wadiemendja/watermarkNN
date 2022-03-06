let wadieExamples = [];
let dahamExamples = [];
let zeghamriExamples = [];
let watermarkClassifier;

function preload() {
   for (let i = 0; i < 100; i++) {
      wadieExamples[i] = loadImage(`../example_generator/sketch_220224a/data/wadiemendja${i}.png`);
      dahamExamples[i] = loadImage(`../example_generator/sketch_220224a/data/dahama${i}.png`);
      zeghamriExamples[i] = loadImage(`../example_generator/sketch_220224a/data/zeghamris${i}.png`);
   }
}

function setup() { }

async function mousePressed() {
   console.log("Training started !");
   watermarkClassifier = await ml5.neuralNetwork({
      inputs: [64, 64, 4],
      task: "imageClassification",
      debug: true
   });
   for (let i = 0; i < wadieExamples.length; i++) {
      watermarkClassifier.addData({ image: wadieExamples[i] }, { label: "Wadie Mendja" });
      watermarkClassifier.addData({ image: dahamExamples[i] }, { label: "Daham A" });
      watermarkClassifier.addData({ image: zeghamriExamples[i] }, { label: "Zeghamri Salah" });
   }
   await watermarkClassifier.normalizeData();
   watermarkClassifier.train({ epochs: 50 }, () => {
      // watermarkClassifier.save();
      console.log("Finished training");
   });
}

// loading dataset
// const dataSet = document.getElementById('dataset');

// for (let i = 0 ; i< 200 ; i++ ) {
//    dataset.innerHTML += `
//       <img src="../example_generator/sketch_220224a/data/wadiemendja${i}.png">
//    `;
//    dataset.innerHTML += `
//       <img src="../example_generator/sketch_220224a/data/dahama${i}.png">
//    `;
//    dataset.innerHTML += `
//       <img src="../example_generator/sketch_220224a/data/zeghamris${i}.png">
//    `;
// }