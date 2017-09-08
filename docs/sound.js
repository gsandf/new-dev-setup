var music = [
	[48, 60, 64, 67, 72],
	[50, 62, 65, 69, 74],
	[53, 65, 69, 72, 77],
	[47, 59, 63, 75, 76]
];

function getContext() {
	window.AudioContext =
		window.AudioContext ||
		window.webkitAudioContext ||
		window.mozAudioContext ||
		window.oAudioContext;
	var context = new AudioContext();
	return context;
}

function createGain(context, velocity) {
	var gain = context.createGain();
	gain.gain.value = velocity;
	return gain;
}

function convertNoteFrequency(note) {
	return Math.pow(2, (note - 69) / 12) * 440;
}

function createOscillator(context, note, shape) {
	var osc = context.createOscillator();
	osc.type = shape;
	osc.frequency.value = convertNoteFrequency(note);
	osc.start();
	return osc;
}

function initSound(gain) {
	return music[0].map(function(m) {
		var osc = createOscillator(context, m, 'sine');
		osc.connect(gain);
		return osc;
	});
}

function nextNote() {
	musicIndex++;
	if (musicIndex > music.length - 1) {
		musicIndex = 0;
	}
	oscs.forEach(function(o, i) {
		o.frequency.value = convertNoteFrequency(music[musicIndex][i]);
	});
}

var context = getContext();
var gain = createGain(context, 0);
var musicIndex = 0;
var runner = null;
gain.connect(context.destination);
var oscs = initSound(gain);

function startSound() {
	gain.gain.value = 0.5;
	runner = setInterval(nextNote, 200);
}

function stopSound() {
	gain.gain.value = 0;
	if (runner) {
		clearInterval(runner);
	}
}
