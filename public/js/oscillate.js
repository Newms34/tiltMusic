function OscillatorSample() {
  this.isPlaying = false;
  this.anchorMe = $('#anchor');
  this.WIDTH = 0;
  this.HEIGHT = 0;
}

OscillatorSample.prototype.play = function() {
  console.log('play');
  // Create some sweet sweet nodes.
  this.oscillator = context.createOscillator();
  this.gain = context.createGain();
  this.gain.value = 0.01;
  this.oscillator.type = 'sine';
  this.oscillator.frequency = '440';

  this.oscillator.connect(this.gain);
  this.gain.connect(context.destination);

  this.oscillator[this.oscillator.start ? 'start' : 'noteOn'](0);
};

OscillatorSample.prototype.stop = function() {
  console.log('stop');
  this.oscillator.stop(0);
};

OscillatorSample.prototype.toggle = function() {
  (this.isPlaying ? this.stop() : this.play());
  this.isPlaying = !this.isPlaying;

};

OscillatorSample.prototype.changeFrequency = function(val) {
  this.oscillator.frequency.value = val;
};
