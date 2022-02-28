let watermarkClassifier;
let testImage = undefined;
const extractWatermarkBtn = document.getElementById('extractWatermarkBtn');
const fileInput = document.getElementById('formFileLg');
const resultsDiv = document.getElementById('results');

async function setup() {
    watermarkClassifier = ml5.neuralNetwork({
        inputs: [64, 64, 4],
        task: "imageClassification",
    });
    const modelDetails = {
        model: '../model/model.json',
        metadata: '../model/model_meta.json',
        weights: '../model/model.weights.bin'
    }
    await watermarkClassifier.load(modelDetails, () => { console.log("Pre-trained model loaded") });
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const selectedImageSrc = URL.createObjectURL(file);
            testImage = loadImage(selectedImageSrc);
        }
    });
}

extractWatermarkBtn.addEventListener('click', () => {
    watermarkClassifier.classify({ image: testImage },
        (err, results) => {
            if (err)
                console.log(err)
            else
                resultsDiv.innerHTML = JSON.stringify(results);
        });
});
