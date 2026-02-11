const gridBox = document.querySelector('.right');
const slider = document.querySelector('.slider');
const pixelDensityValue = document.querySelector('.slider-value');

// color
const canvasColor = document.getElementById('background');
const brushColor = document.getElementById('foreground');

// modes
const solidMode = document.querySelector('.solid');
const spectrumMode = document.querySelector('.spectrum');
const shadeMode = document.querySelector('.shade');
const glowMode = document.querySelector('.glow');
const eraseMode = document.querySelector('.erase');

// grid and actions
const gridOverlay = document.querySelector('.gridOverlay');
const clearCanvas = document.querySelector('.clear-canvas');
const resetDefaults = document.querySelector('.reset-defaults');

// default settings when app launches
solidMode.classList.toggle('active');
gridOverlay.classList.toggle('active');
// gridBox.style.background = canvasColor.value;

// solid mode
solidMode.addEventListener('click', () => {
	solidMode.classList.add('active');
	spectrumMode.classList.remove('active');
	shadeMode.classList.remove('active');
	glowMode.classList.remove('active');
	eraseMode.classList.remove('active');
});

spectrumMode.addEventListener('click', () => {
	spectrumMode.classList.add('active');
	solidMode.classList.remove('active');
	shadeMode.classList.remove('active');
	glowMode.classList.remove('active');
	eraseMode.classList.remove('active');
});

shadeMode.addEventListener('click', () => {
	shadeMode.classList.add('active');
	spectrumMode.classList.remove('active');
	solidMode.classList.remove('active');
	glowMode.classList.remove('active');
	eraseMode.classList.remove('active');
});

glowMode.addEventListener('click', () => {
	glowMode.classList.add('active');
	shadeMode.classList.remove('active');
	spectrumMode.classList.remove('active');
	solidMode.classList.remove('active');
	eraseMode.classList.remove('active');
});

eraseMode.addEventListener('click', () => {
	eraseMode.classList.add('active');
	glowMode.classList.remove('active');
	shadeMode.classList.remove('active');
	spectrumMode.classList.remove('active');
	solidMode.classList.remove('active');
});

gridOverlay.addEventListener('click', () => {
	const pixels = gridBox.querySelectorAll('.grid');
	pixels.forEach((grid) => {
		if (grid.style.border == 'none') {
			grid.style.border = '0.5px solid #e6e6e6';
			gridOverlay.classList.add('active');
		} else {
			grid.style.border = 'none';
			gridOverlay.classList.remove('active');
		}
	});
});

clearCanvas.addEventListener('click', () => {
	const pixels = gridBox.querySelectorAll('.grid');
	pixels.forEach((grid) => {
		grid.style.background = '';
	});
});

resetDefaults.addEventListener('click', () => {
	const pixels = gridBox.querySelectorAll('.grid');
	pixels.forEach((grid) => {
		grid.style.background = '';
		grid.style.border = '0.5px solid #e6e6e6';
	});
	brushColor.value = '#000000';
	canvasColor.value = '#efefef';
	gridBox.style.background = canvasColor.value;
	slider.value = '16';
	pixelDensityValue.textContent = `(${slider.value}x${slider.value})`;
	generateGrid();
});

function generateGrid() {
	const pixelDensity = +slider.value;
	pixelDensityValue.textContent = `(${pixelDensity}x${pixelDensity})`;
	gridBox.textContent = '';

	for (i = 1; i <= pixelDensity; i++) {
		const row = document.createElement('div');
		row.classList.add('row');

		for (j = 1; j <= pixelDensity; j++) {
			const pixel = document.createElement('div');
			pixel.classList.add('grid');
			row.appendChild(pixel);
		}

		gridBox.appendChild(row);
	}
	gridOverlay.classList.add('active');
}

// generates default grid when app launches
generateGrid();

// reads the value of slider and generates the grid
slider.addEventListener('input', generateGrid);

// reads the value of canvas color and applies to canvas
canvasColor.addEventListener('input', (e) => {
	gridBox.style.background = e.target.value;
});

// handle the drawing feature
gridBox.addEventListener('mousedown', startDrawing);
gridBox.addEventListener('mousemove', draw);
gridBox.addEventListener('mouseup', stopDrawing);

let isDrawing = false;
function startDrawing(e) {
	isDrawing = true;
	if (e.target.classList.contains('grid') && solidMode.classList.contains('active')) {
		e.target.style.background = brushColor.value;
		e.target.style.opacity = 1.0;
	} else if (e.target.classList.contains('grid') && spectrumMode.classList.contains('active')) {
		e.target.style.background = generateRandomColor();
		e.target.style.opacity = 1.0;
	} else if (e.target.classList.contains('grid') && shadeMode.classList.contains('active')) {
		shade(e);
	} else if (e.target.classList.contains('grid') && glowMode.classList.contains('active')) {
		glow(e);
	} else if (e.target.classList.contains('grid') && eraseMode.classList.contains('active')) {
		erase(e);
	}

	console.log('mouse DOWN');
}

function draw(e) {
	if (!isDrawing) return;
	if (e.target.classList.contains('grid') && solidMode.classList.contains('active')) {
		e.target.style.background = brushColor.value;
		e.target.style.opacity = 1.0;
	} else if (e.target.classList.contains('grid') && spectrumMode.classList.contains('active')) {
		e.target.style.background = generateRandomColor();
		e.target.style.opacity = 1.0;
	} else if (e.target.classList.contains('grid') && shadeMode.classList.contains('active')) {
		shade(e);
	} else if (e.target.classList.contains('grid') && glowMode.classList.contains('active')) {
		glow(e);
	} else if (e.target.classList.contains('grid') && eraseMode.classList.contains('active')) {
		erase(e);
	}
	console.log('isDrawing', isDrawing);
	console.log('mouse MOVE');
}

function stopDrawing() {
	isDrawing = false;
	console.log('mouse UP drawing stopped');
	console.log('isDrawing', isDrawing);
}

function generateRandomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);

	let rgb = `rgb(${r}, ${g}, ${b})`;
	console.log(rgb);
	return rgb;
}

let op = 1;

const grid = gridBox.querySelectorAll('.grid');

function shade(e) {
	if (Number(e.target.style.opacity) === 0 || e.target.style.opacity < 1) {
		if (e.target.style.background === '') {
			e.target.style.background = brushColor.value;
		}
		if (e.target.style.opacity === '1') return;
		e.target.style.opacity = Number(e.target.style.opacity) + 0.1;
	}
}

function glow(e) {
	if (!e.target.style.background) return;
	if (e.target.style.opacity === '0') return;
	if (e.target.style.opacity <= '1') {
		if (e.target.style.background === '') {
			e.target.style.background = brushColor.value;
		}
		e.target.style.opacity = Number(e.target.style.opacity) - 0.1;
	}
}

function erase(e) {
	e.target.style.background = '';
}
