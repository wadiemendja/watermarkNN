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
    watermarkImageBtn.style.display = "";
    animation.innerHTML = "";
  }
});

// watermark image button click event
watermarkImageBtn.addEventListener('click', () => {
  run(selectedImageSrc, watermarkTextAria.value);
});

/**
 *Picture path to canvas
 *@ param {image URL} URL
 */
async function imgToCanvas(url) {
  //Create img element
  const img = document.createElement("img");
  img.src = url;
  img.setAttribute("crossorigin", "anonymous"); // prevent failed to execute 'todataurl' on 'htmlcanvas element' caused by cross domain: tainted canvas may not be exported
  await new Promise((resolve) => (img.onload = resolve));
  //Create the canvas DOM element and set its width and height to be the same as the picture
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  //The coordinates (0,0) indicate that the drawing starts from here and is equivalent to an offset.
  canvas.getContext("2d").drawImage(img, 0, 0);
  return canvas;
}

/**
 *Add watermark to canvas
 *@ param {canvas object} canvas
 *@ param {watermark text} text
 */
function addWatermark(canvas, text) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 20, 20);
  return canvas;
}

/**
 *Convert canvas to img
 *@ param {canvas object} canvas
 */
function convasToImg(canvas) {
  //Create a new image object, which can be understood as dom
  var image = new Image();
  // canvas.toDataURL  It returns a string of Base64 encoded URLs
  //Specified format png
  image.src = canvas.toDataURL("image/png");
  return image;
}

//Running examples
async function run(imgUrl, text) {
  //1. Convert the image path to canvas
  const tempCanvas = await imgToCanvas(imgUrl);
  //2. Add watermark to canvas
  const canvas = addWatermark(tempCanvas, text);
  //3. Convert canvas to img
  const img = convasToImg(canvas);
  //View effects
  watermarkedImage.appendChild(img);
}

