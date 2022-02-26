let watermarkClassifier;
let testImage = undefined;

async function setup() {
    createCanvas(400,400);
    watermarkClassifier = await ml5.neuralNetwork({
        inputs: [64, 64, 4],
        task: "imageClassification",
    });
    const modelDetails = {
        model: '../model/model.json',
        metadata: '../model/model_meta.json',
        weights: '../model/model.weights.bin'
    }
    await watermarkClassifier.load(modelDetails, () => { console.log("Pre-trained model loaded") });
    testImage = await loadImage("../example_generator/testGenerator/data/test11.png");
}

function mousePressed() {
    watermarkClassifier.classify({ image: testImage },
        (err, results) => {
            if (err)
                console.log(err)
            else
                console.log(results);
        });
}