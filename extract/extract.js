let watermarkClassifier;
const extractWatermarkBtn = document.getElementById('extractWatermarkBtn');
const fileInput = document.getElementById('formFileLg');
const resultsDiv = document.getElementById('results');
const modelStatus = document.getElementById('modelStatus');
const selectedImageDiv = document.getElementById('selectedImageDiv');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const testImage = new Image();

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
    await watermarkClassifier.load(modelDetails, () => { modelStatus.innerHTML = "Pre-trained model loaded" });
    fileInput.addEventListener('change', (event) => {
        resultsDiv.innerHTML = "";
        const file = event.target.files[0];
        if (file) {
            const selectedImageSrc = URL.createObjectURL(file);
            selectedImageDiv.innerHTML = `<img src=${selectedImageSrc} id="imageToCrop">`;
            const imageToCrop = document.getElementById('imageToCrop');
            imageToCrop.src = selectedImageSrc;
            imageToCrop.onload = () => { cropImage(imageToCrop); }
            extractWatermarkBtn.disabled = false;
        }
    });
}
// crop image
function cropImage(image) {
    ctx.drawImage(image, 0, 0, 64, 64, 0, 0, 64, 64);
    // blackWhiteFilter();
}
// display results
extractWatermarkBtn.addEventListener('click', async () => {
    extractWatermarkBtn.disabled = true;
    setTimeout(extractWatermark, 100);
});
// extracting process
function extractWatermark() {
    const canvasImageURL = canvas.toDataURL();
    testImage.src = canvasImageURL;
    testImage.onload = () => {
        watermarkClassifier.classify({ image: testImage }, (err, results) => {
            if (err)
                console.log(err)
            else {
                const label = results[0].label;
                const confidence = results[0].confidence;
                if (confidence >= 0.85) 
                resultsDiv.innerHTML = `Results:<br>label: ${label}<br>confidence: ${confidence}`;
                else resultsDiv.innerHTML = "No watermark detected !"
                console.log(results);
                extractWatermarkBtn.disabled = false;
            }
        });
    }
}
// filtering image 
function blackWhiteFilter() {
    var imgPixels = ctx.getImageData(0, 0, 64, 64);
    for (var y = 0; y < imgPixels.height; y++) {
        for (var x = 0; x < imgPixels.width; x++) {
            var i = (y * 4) * imgPixels.width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
            imgPixels.data[i] = avg;
            imgPixels.data[i + 1] = avg;
            imgPixels.data[i + 2] = avg;
        }
    }
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
}
