const frame4x4 = Array.from({ length: 128 }, () => Array.from({ length: 128 }, () => '#128594'));
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const bucket = document.getElementById('bucket');
const chooseColor = document.getElementById('choose_color');
const pencil = document.getElementById('pencil');
pencil.classList.add('active');

const currColorInput = document.getElementById('curr-icon-input');
const currColor = document.querySelector('.curr-icon');
currColor.style.backgroundColor = '#01d53c';
const prewColor = document.querySelector('.prev-icon');
const redColor = document.querySelector('.red-icon');
const blueColor = document.querySelector('.blue-icon');

const smallCanvas = document.getElementById('128x128_item');
const mediumCanvas = document.getElementById('256x256_item');
const largeCanvas = document.getElementById('512x512_item');
let reductionNumber = 1;
let reductionPixelNumber = 1;
let canvasSize = 512;

function activeButtonClick(button) {
  if (button.classList.contains('active')) {
    button.classList.remove('active');
    return;
  }
  button.classList.add('active');
}

function activeButtonKeyboard(element) {
  if (element.classList.contains('active')) {
    element.classList.remove('active');
    return;
  }
  element.classList.add('active');
}

function drawImageOnCanvas(size, reduct, reductPixel) {
  canvas.width = size;
  canvas.height = size;
  const img = new Image();
  img.src = localStorage.getItem('savekey');
  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size);
  };
  reductionNumber = reduct;
  reductionPixelNumber = reductPixel;
  canvasSize = size;
}


const dataURL = localStorage.getItem('savekey') || null;
if (dataURL !== null) {
  drawImageOnCanvas(512, 1, 4);
} else {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame4x4.forEach((row, i) => {
    row.forEach((column, j) => {
      ctx.fillStyle = `${column}`;
      ctx.fillRect(j * 4, i * 4, 4, 4);
    });
  });
}


// Handler for click on Current color circle in the "color section"
currColorInput.addEventListener('change', () => {
  currColor.style.backgroundColor = `${currColorInput.value}`;
});


document.addEventListener('click', (event) => {
// Canvas bucket and pencil handlers
  if (event.target === canvas) {
    const coorX = event.offsetX;
    const coorY = event.offsetY;

    if (bucket.classList.contains('active')) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame4x4.forEach((row, i) => {
        row.forEach((column, j) => {
          ctx.fillStyle = `${currColor.style.backgroundColor}`;
          frame4x4[i][j] = `${currColor.style.backgroundColor}`;
          ctx.fillRect(j * 4, i * 4, 4, 4);
        });
      });
      localStorage.setItem('frame', JSON.stringify(frame4x4));
    }

    if (pencil.classList.contains('active')) {
      const pixelCanvas = canvas.getContext('2d').getImageData(coorX / reductionNumber, coorY / reductionNumber, reductionPixelNumber, reductionPixelNumber);
      const currRgbColor = currColor.style.backgroundColor.match(/\b(\d+)\b/g).map(Number);

      for (let i = 0; i < pixelCanvas.data.length; i += 4) {
        [pixelCanvas.data[i], pixelCanvas.data[i + 1], pixelCanvas.data[i + 2]] = currRgbColor;
      }
      ctx.putImageData(pixelCanvas, coorX / reductionNumber, coorY / reductionNumber);
    }
  }

  // Handlers for clicks on buttons
  if (event.target.closest('#bucket') === bucket) {
    activeButtonClick(bucket);
  }
  if (event.target.closest('#choose_color') === chooseColor) {
    activeButtonClick(chooseColor);
  }
  if (event.target.closest('#pencil') === pencil) {
    activeButtonClick(pencil);
  }

  // Handlers for clicks on circles in the "color section"
  if (event.target.closest('.curr-icon') === currColor) {
    prewColor.style.backgroundColor = `${getComputedStyle(currColor).backgroundColor}`;
    currColorInput.click();
  }
  if (event.target.closest('.prev-icon') === prewColor) {
    currColor.style.backgroundColor = `${getComputedStyle(prewColor).backgroundColor}`;
  }
  if (event.target.closest('.red-icon') === redColor) {
    currColor.style.backgroundColor = `${getComputedStyle(redColor).backgroundColor}`;
  }
  if (event.target.closest('.blue-icon') === blueColor) {
    currColor.style.backgroundColor = `${getComputedStyle(blueColor).backgroundColor}`;
  }

  // Canvas handlers for choose color
  if (chooseColor.classList.contains('active')) {
    if (event.target !== canvas) {
      currColor.style.backgroundColor = `${getComputedStyle(event.target).backgroundColor}`;
      return;
    }
    const coorX = event.offsetX / reductionNumber;
    const coorY = event.offsetY / reductionNumber;

    const canvasColor = canvas.getContext('2d').getImageData(coorX, coorY, 1, 1).data;
    currColor.style.backgroundColor = `rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`;
  }

  // Handlers for changing the canvas size
  if (event.target.closest('.canvas_nav_block-item') === smallCanvas) {
    drawImageOnCanvas(128, 4, 1);
  }
  if (event.target.closest('.canvas_nav_block-item') === mediumCanvas) {
    drawImageOnCanvas(256, 2, 2);
  }
  if (event.target.closest('.canvas_nav_block-item') === largeCanvas) {
    drawImageOnCanvas(512, 1, 4);
  }
});

// Keyboard event handlers
document.addEventListener('keyup', (event) => {
  if (event.code === 'KeyB') {
    activeButtonKeyboard(bucket);
  }
  if (event.code === 'KeyP') {
    activeButtonKeyboard(pencil);
  }
  if (event.code === 'KeyC') {
    activeButtonKeyboard(chooseColor);
  }
});


async function getLinkToImage(searchText) {
  const url = `https://api.unsplash.com/photos/random?query=town,${searchText}&client_id=98016397a2a858d3d5d19887ed4ca375edb159e3436c37715cc86aed6197614d`;
  try {
    const response = await fetch(url);
    const image = await response.json();
    return image.urls.small;
  } catch (e) {
    throw new Error(e);
  }
}

const loadBtn = document.querySelector('.canvas_features_block-load');
const txtSearch = document.querySelector('.canvas_features_block-text');
const bAndWButton = document.querySelector('.canvas_features_block-bw');

// Handler for loading image from the server
loadBtn.addEventListener('click', () => {
  getLinkToImage(txtSearch.value).then((value) => {
    if (canvas.getContext) {
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pic = new Image();
      pic.crossOrigin = 'Anonymous';
      pic.src = value;
      pic.onload = () => {
        if (pic.width === pic.height) {
          ctx.drawImage(pic, 0, 0, canvasSize, canvasSize);
        }
        if (pic.width < pic.height) {
          ctx.drawImage(pic, (canvasSize - (pic.width * canvasSize) / pic.height) / 2,
            0, (pic.width * canvasSize) / pic.height, canvasSize);
        }
        if (pic.width > pic.height) {
          ctx.drawImage(pic, 0, (canvasSize - (pic.height * canvasSize) / pic.width) / 2,
            canvasSize, (pic.height * canvasSize) / pic.width);
        }
        localStorage.setItem('savekey', canvas.toDataURL());
        localStorage.setItem('isImage', 'true');
      };
    }
  });
});

// Handler for changing canvas to black and white color
bAndWButton.addEventListener('click', () => {
  if (localStorage.getItem('isImage') !== 'true') {
    alert('Image First'); // eslint-disable-line no-alert
    return;
  }

  const image = ctx.getImageData(0, 0, 512, 512);
  const pixel = image.data;
  for (let i = 0, n = pixel.length; i < n; i += 4) {
    const grayscale = pixel[i] * 0.3 + pixel[i + 1] * 0.59 + pixel[i + 2] * 0.11;
    pixel[i] = grayscale;
    pixel[i + 1] = grayscale;
    pixel[i + 2] = grayscale;
  }
  ctx.putImageData(image, 0, 0);
  localStorage.setItem('savekey', canvas.toDataURL());
});
