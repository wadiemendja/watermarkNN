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
    ctx.fillStyle = "rgba(255, 165, 0, 10%)";
    ctx.font = "9px Georgia";
    ctx.textBaseline = "middle";
    const a = 2;
    const b = 10;
    const lineheight = 15;
    const lines = text.split('\n');
    for (var j = 0; j < lines.length; j++)
        ctx.fillText(lines[j], a, b + (j * lineheight));
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
async function runWatermarking(imgUrl, watermarkedImageDiv, text) {
    //1. Convert the image path to canvas
    const tempCanvas = await imgToCanvas(imgUrl);
    //2. Add watermark to canvas
    const canvas = addWatermark(tempCanvas, text);
    //3. Convert canvas to img
    const img = convasToImg(canvas);
    //View effects
    watermarkedImageDiv.appendChild(img);
}

export { runWatermarking };