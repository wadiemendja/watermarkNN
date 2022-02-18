const fileInput  = document.getElementById('formFileLg');
const selectedImgDiv = document.getElementById('selectedImage');
const animation = document.querySelector('.animation');

// previewing image
fileInput.addEventListener('change', (event)=> {
  const file = event.target.files[0];
  if (file)
    selectedImgDiv.innerHTML = `<img src="${URL.createObjectURL(file)}">`;
    animation.innerHTML = "";
});