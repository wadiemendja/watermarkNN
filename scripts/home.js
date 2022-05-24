import { runWatermarking } from "./watermark.js";

const fileInput = document.getElementById('formFileLg');
const selectedImgDiv = document.getElementById('selectedImage');
const animation = document.querySelector('.animation');
let selectedImageSrc = undefined;
const watermarkImageBtn = document.getElementById('watermarkImage');
const watermarkSelector = document.getElementById('watermarkSelector');
const opacity = document.getElementById('opacity');
const watermarkedImageDiv = document.getElementById('watermarkedImage');
const donwloadImage = document.getElementById('downloadImage');
const downloadImageBtn = document.getElementById('downloadImageBtn');
watermarkImageBtn.style.display = downloadImageBtn.style.display = "none";
let imgType = undefined;
// previewing image
fileInput.addEventListener('change', (event) => {
  downloadImageBtn.disabled = true;
  const file = event.target.files[0];
  if (file) {
    imgType = file.type;
    console.log(imgType)
    selectedImageSrc = URL.createObjectURL(file);
    selectedImgDiv.innerHTML = `<img src="${selectedImageSrc}">`;
    watermarkedImageDiv.innerHTML = "";
    watermarkImageBtn.style.display = downloadImageBtn.style.display = "";
    animation.innerHTML = "";
  }
});

// watermark image button click event
watermarkImageBtn.addEventListener('click', async (event) => {
  const thisBtn = event.target;
  watermarkedImageDiv.innerHTML = "";
  thisBtn.disabled = true;
  await runWatermarking(selectedImageSrc, watermarkedImageDiv, watermarkSelector.value, opacity.value);
  donwloadImage.href = watermarkedImageDiv.querySelector("img").src;
  downloadImageBtn.disabled = false;
  thisBtn.disabled = false;
});

const originalMarksPath = "../img/original_watermarks/";
const markImage = document.getElementById('markImage');
// show default selected watermark
markImage.src =  originalMarksPath + watermarkSelector.value + ".png";
// show selected watermark
watermarkSelector.addEventListener('change', (event) => {
  markImage.src = originalMarksPath + watermarkSelector.value + ".png";
});