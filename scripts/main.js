import { runWatermarking } from "./watermark.js";

const fileInput = document.getElementById('formFileLg');
const selectedImgDiv = document.getElementById('selectedImage');
const animation = document.querySelector('.animation');
let selectedImageSrc = undefined;
const watermarkImageBtn = document.getElementById('watermarkImage');
const watermarkTextAria = document.getElementById('watermarkText');
const watermarkedImage = document.getElementById('watermarkedImage');
watermarkTextAria.value = "Wadie Mendja";
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
  console.log(watermarkTextAria.value)
});