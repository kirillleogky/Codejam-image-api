/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const frame4x4 = Array.from({ length: 128 }, () => Array.from({ length: 128 }, () => '#128594'));\nconst canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\n\nconst bucket = document.getElementById('bucket');\nconst chooseColor = document.getElementById('choose_color');\nconst pencil = document.getElementById('pencil');\npencil.classList.add('active');\n\nconst currColorInput = document.getElementById('curr-icon-input');\nconst currColor = document.querySelector('.curr-icon');\ncurrColor.style.backgroundColor = '#01d53c';\nconst prewColor = document.querySelector('.prev-icon');\nconst redColor = document.querySelector('.red-icon');\nconst blueColor = document.querySelector('.blue-icon');\n\nconst smallCanvas = document.getElementById('128x128_item');\nconst mediumCanvas = document.getElementById('256x256_item');\nconst largeCanvas = document.getElementById('512x512_item');\nlet reductionNumber = 1;\nlet reductionPixelNumber = 1;\nlet canvasSize = 512;\n\nfunction activeButtonClick(button) {\n  if (button.classList.contains('active')) {\n    button.classList.remove('active');\n    return;\n  }\n  button.classList.add('active');\n}\n\nfunction activeButtonKeyboard(element) {\n  if (element.classList.contains('active')) {\n    element.classList.remove('active');\n    return;\n  }\n  element.classList.add('active');\n}\n\nfunction drawImageOnCanvas(size, reduct, reductPixel) {\n  canvas.width = size;\n  canvas.height = size;\n\n  const img = new Image();\n  img.crossOrigin = 'Anonymous';\n  img.src = localStorage.getItem('saveImage');\n  img.onload = () => {\n    if (img.width === img.height) {\n      ctx.drawImage(img, 0, 0, size, size);\n    }\n    if (img.width < img.height) {\n      ctx.drawImage(img, (size - (img.width * size) / img.height) / 2,\n        0, (img.width * size) / img.height, size);\n    }\n    if (img.width > img.height) {\n      ctx.drawImage(img, 0, (size - (img.height * size) / img.width) / 2,\n        size, (img.height * size) / img.width);\n    }\n\n    // Сhecks if need to convert the image to b & w\n    if (document.querySelector('.canvas_features_block-bw').classList.contains('black_and_white_active')) {\n      const image = ctx.getImageData(0, 0, 512, 512);\n      const pixel = image.data;\n      for (let i = 0, n = pixel.length; i < n; i += 4) {\n        const grayscale = pixel[i] * 0.3 + pixel[i + 1] * 0.59 + pixel[i + 2] * 0.11;\n        pixel[i] = grayscale;\n        pixel[i + 1] = grayscale;\n        pixel[i + 2] = grayscale;\n      }\n      ctx.putImageData(image, 0, 0);\n    }\n  };\n  canvasSize = size;\n  reductionNumber = reduct;\n  reductionPixelNumber = reductPixel;\n}\n\n\nconst dataImage = localStorage.getItem('saveImage') || null;\nif (dataImage !== null) {\n  drawImageOnCanvas(512, 1, 4);\n} else {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  frame4x4.forEach((row, i) => {\n    row.forEach((column, j) => {\n      ctx.fillStyle = `${column}`;\n      ctx.fillRect(j * 4, i * 4, 4, 4);\n    });\n  });\n}\n\n\n// Handler for click on Current color circle in the \"color section\"\ncurrColorInput.addEventListener('change', () => {\n  currColor.style.backgroundColor = `${currColorInput.value}`;\n});\n\n\ndocument.addEventListener('click', (event) => {\n// Canvas bucket and pencil handlers\n  if (event.target === canvas) {\n    const coorX = event.offsetX;\n    const coorY = event.offsetY;\n\n    if (bucket.classList.contains('active')) {\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\n      frame4x4.forEach((row, i) => {\n        row.forEach((column, j) => {\n          ctx.fillStyle = `${currColor.style.backgroundColor}`;\n          frame4x4[i][j] = `${currColor.style.backgroundColor}`;\n          ctx.fillRect(j * 4, i * 4, 4, 4);\n        });\n      });\n      localStorage.setItem('frame', JSON.stringify(frame4x4));\n    }\n\n    if (pencil.classList.contains('active')) {\n      const pixelCanvas = canvas.getContext('2d').getImageData(coorX / reductionNumber, coorY / reductionNumber, reductionPixelNumber, reductionPixelNumber);\n      const currRgbColor = currColor.style.backgroundColor.match(/\\b(\\d+)\\b/g).map(Number);\n\n      for (let i = 0; i < pixelCanvas.data.length; i += 4) {\n        [pixelCanvas.data[i], pixelCanvas.data[i + 1], pixelCanvas.data[i + 2]] = currRgbColor;\n      }\n      ctx.putImageData(pixelCanvas, coorX / reductionNumber, coorY / reductionNumber);\n    }\n  }\n\n  // Handlers for clicks on buttons\n  if (event.target.closest('#bucket') === bucket) {\n    activeButtonClick(bucket);\n  }\n  if (event.target.closest('#choose_color') === chooseColor) {\n    activeButtonClick(chooseColor);\n  }\n  if (event.target.closest('#pencil') === pencil) {\n    activeButtonClick(pencil);\n  }\n\n  // Handlers for clicks on circles in the \"color section\"\n  if (event.target.closest('.curr-icon') === currColor) {\n    prewColor.style.backgroundColor = `${getComputedStyle(currColor).backgroundColor}`;\n    currColorInput.click();\n  }\n  if (event.target.closest('.prev-icon') === prewColor) {\n    currColor.style.backgroundColor = `${getComputedStyle(prewColor).backgroundColor}`;\n  }\n  if (event.target.closest('.red-icon') === redColor) {\n    currColor.style.backgroundColor = `${getComputedStyle(redColor).backgroundColor}`;\n  }\n  if (event.target.closest('.blue-icon') === blueColor) {\n    currColor.style.backgroundColor = `${getComputedStyle(blueColor).backgroundColor}`;\n  }\n\n  // Canvas handlers for choose color\n  if (chooseColor.classList.contains('active')) {\n    if (event.target !== canvas) {\n      currColor.style.backgroundColor = `${getComputedStyle(event.target).backgroundColor}`;\n      return;\n    }\n    const coorX = event.offsetX / reductionNumber;\n    const coorY = event.offsetY / reductionNumber;\n\n    const canvasColor = canvas.getContext('2d').getImageData(coorX, coorY, 1, 1).data;\n    currColor.style.backgroundColor = `rgb(${canvasColor[0]},${canvasColor[1]},${canvasColor[2]})`;\n  }\n\n  // Handlers for changing the canvas size\n  if (event.target.closest('.canvas_nav_block-item') === smallCanvas) {\n    drawImageOnCanvas(128, 4, 1);\n  }\n  if (event.target.closest('.canvas_nav_block-item') === mediumCanvas) {\n    drawImageOnCanvas(256, 2, 2);\n  }\n  if (event.target.closest('.canvas_nav_block-item') === largeCanvas) {\n    drawImageOnCanvas(512, 1, 4);\n  }\n});\n\n// Keyboard event handlers\ndocument.addEventListener('keyup', (event) => {\n  if (event.code === 'KeyB') {\n    activeButtonKeyboard(bucket);\n  }\n  if (event.code === 'KeyP') {\n    activeButtonKeyboard(pencil);\n  }\n  if (event.code === 'KeyC') {\n    activeButtonKeyboard(chooseColor);\n  }\n});\n\n\nasync function getLinkToImage(searchText) {\n  const url = `https://api.unsplash.com/photos/random?query=town,${searchText}&client_id=98016397a2a858d3d5d19887ed4ca375edb159e3436c37715cc86aed6197614d`;\n  try {\n    const response = await fetch(url);\n    const image = await response.json();\n    return image.urls.small;\n  } catch (e) {\n    throw new Error(e);\n  }\n}\n\nconst loadBtn = document.querySelector('.canvas_features_block-load');\nconst txtSearch = document.querySelector('.canvas_features_block-text');\nconst bAndWButton = document.querySelector('.canvas_features_block-bw');\n\n// Handler for loading image from the server\nloadBtn.addEventListener('click', () => {\n  getLinkToImage(txtSearch.value).then((value) => {\n    if (canvas.getContext) {\n      ctx.imageSmoothingEnabled = false;\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\n      localStorage.setItem('saveImage', value);\n      localStorage.setItem('isImage', 'true');\n      drawImageOnCanvas(canvasSize, reductionNumber, reductionPixelNumber);\n    }\n  });\n});\n\n// Handler for changing canvas to black and white color\nbAndWButton.addEventListener('click', () => {\n  if (localStorage.getItem('isImage') !== 'true') {\n    alert('Image First'); // eslint-disable-line no-alert\n    return;\n  }\n\n  if (bAndWButton.classList.contains('black_and_white_active')) {\n    bAndWButton.classList.remove('black_and_white_active');\n  } else {\n    bAndWButton.classList.add('black_and_white_active');\n    drawImageOnCanvas(canvasSize, reductionNumber, reductionPixelNumber);\n  }\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });