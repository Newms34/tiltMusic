var Instrument = function Instrument() {
  var $instruments; 
  console.log('requested instruments file');
  $.get('/instruments/Bass.txt', function(data) {
    $instruments = data;
    console.log(data);
  });



  var chordProgression =  [[0,4,7],[-3,0,4],[-7,-3,0],[-5,-1,2]];

  // function toggle() {     $("button").toggle();
  // }
  var chordFunc = function(start, n) {
    var a = 1.059;
    console.log(a);
    var freq = start || 440 * Math.pow(a,3);
    console.log(freq * Math.pow(a,n))
    return freq * Math.pow(a,n);
    
  };

  this.play = function play() {
    var osc1 = audioContext.createOscillator();
    var osc2 = audioContext.createOscillator();
    var osc3 = audioContext.createOscillator();
    osc1.setPeriodicWave(hornTable);            
    osc2.setPeriodicWave(hornTable);
    osc3.setPeriodicWave(hornTable);
    
    var gainNode1 = audioContext.createGain();
    osc1.connect(gainNode1);
    var gainNode2 = audioContext.createGain();
    osc2.connect(gainNode2);
    var gainNode3 = audioContext.createGain();
    osc3.connect(gainNode3);
    gainNode1.gain.value = .03;
    gainNode2.gain.value = .03;
    gainNode3.gain.value = .03;
    gainNode1.connect(audioContext.destination);
    gainNode2.connect(audioContext.destination);
    gainNode3.connect(audioContext.destination);
    var count = 0;
    chordProgression.forEach(function(chord) {
      setTimeout(function() {
        osc1.frequency.value = chordFunc(null, chord[0]);
        osc2.frequency.value = chordFunc(null, chord[1]);
        osc3.frequency.value = chordFunc(null, chord[2]);
        
      }, count++ * 2000);
    });
    osc1.start();
    osc2.start();
    osc3.start();
  }
};
