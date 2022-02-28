import { runWatermarking } from "./watermark.js";

const fileInput = document.getElementById('formFileLg');
const selectedImgDiv = document.getElementById('selectedImage');
const animation = document.querySelector('.animation');
let selectedImageSrc = undefined;
const watermarkImageBtn = document.getElementById('watermarkImage');
const watermarkTextAria = document.getElementById('watermarkText');
const watermarkedImageDiv = document.getElementById('watermarkedImage');
const donwloadImage = document.getElementById('downloadImage');
const downloadImageBtn = document.getElementById('downloadImageBtn');
watermarkImageBtn.style.display = downloadImageBtn.style.display = "none";
watermarkTextAria.value = "Wadie Mendja";

// previewing image
fileInput.addEventListener('change', (event) => {
  downloadImageBtn.disabled = true;
  const file = event.target.files[0];
  if (file) {
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
  thisBtn.disabled = true;
  await runWatermarking(selectedImageSrc, watermarkedImageDiv, watermarkTextAria.value);
  donwloadImage.href = watermarkedImageDiv.querySelector("img").src;
  downloadImageBtn.disabled = false;
  thisBtn.disabled = false;
});