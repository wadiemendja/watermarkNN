import { runWatermarking } from "./watermark.js";

const fileInput = document.getElementById('formFileLg');
const selectedImgDiv = document.getElementById('selectedImage');
const animation = document.querySelector('.animation');
let selectedImageSrc = undefined;
const watermarkImageBtn = document.getElementById('watermarkImage');
const watermarkTextAria = document.getElementById('watermarkText');
const watermarkedImage = document.getElementById('watermarkedImage');
watermarkTextAria.value = "Name : Wadie Mendja";
watermarkImageBtn.style.display = "none";

// previewing image
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedImageSrc = URL.createObjectURL(file);
    selectedImgDiv.innerHTML = `<img src="${selectedImageSrc}">`;
    watermarkedImage.innerHTML = "";
    watermarkImageBtn.style.display = "";
    animation.innerHTML = "";
  }
});

// watermark image button click event
watermarkImageBtn.addEventListener('click', async (event) => {
  /**
  *@ param {image URL , watermarkedImageDiv, textWatermark} URL
  */
  const thisBtn = event.target;
  thisBtn.disabled = true;
  await runWatermarking(selectedImageSrc, watermarkedImage, watermarkTextAria.value);
  thisBtn.disabled = false;
  // Initialize the Image Classifier method with MobileNet
  const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

  // When the model is loaded
  function modelLoaded() {
    console.log('Model Loaded!');
  }

  // Make a prediction with a selected image
  classifier.classify(selectedImgDiv.querySelector('img'), (err, results) => {
    console.log(results);
  });
});