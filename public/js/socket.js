var socket = io();
var oscList = {}; //object where each key is uuid and value is an array of oscillators (chord)
var allPlayin = false; //we makin sweet, sweet music?
var own_uuid = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

// var soundies = new OscillatorSample();//initialize an instance of the sound thingy. We may need to do this multiple times per user eventually.
// //Can we use multiple oscillators per audiocontext? Or just one?
window.addEventListener('deviceorientation', function(e) {
    var pitch = Math.floor((Math.max(0, Math.min(e.beta, 90)) / 90) * 360)
    
    allPlayin ? socket.emit('userSoundToServer', {pitch: pitch, uuid: own_uuid}) : null;
    $('#freqMon').val( pitch );
})
socket.on('soundPitch', function(userChord) {
    //gotta rewrite this as a foreach for each separate osc.
    //console.log(allFreqs, allFreqs.length);
    var allFreqs = userChord.allFreqs;
    var uuid = userChord.uuid;
    if(!oscList[uuid]) {
      oscList[uuid] = [];
    }
//    while (oscList.length != allFreqs.length) {
//        //while loopz to adjust oscList length
//        if (oscList.length < allFreqs.length) {
//            //need moar!
//            var oscInstance = new OscillatorSample();
//            oscList.push(oscInstance);
//        } else if (oscList.length > allFreqs.length) {
//            oscList.pop();
//        }
//    }
        //we now have exactly the same amount of oscillators as users.
    //console.log(allFreqs, oscList)
    for (var i = 0; i < allFreqs.length; i++) {
        console.log('allFreq[i]', allFreqs[i]);
        if (oscList[uuid][i] && oscList[uuid][i].isPlaying) {
            oscList[uuid][i].changeFrequency(allFreqs[i]); //adjust all oscillator freqs
        } else {
          oscList[uuid][i] = new OscillatorSample();
             
//          oscList[uuid][i].changeFrequency(allFreqs[i]);
        }
    }
//    angular.element($('#angMain')).scope().freqShow(allFreqs);
//    $('#oscList').text(JSON.stringify(oscList));
});

function toggleAll() {
    console.log('Toggling play active!');
    (allPlayin) ? allPlayin = false: allPlayin = true;
    Object.keys(oscList).forEach(function(curr_uuid) {
      for (var i = 0; i < oscList[curr_uuid].length; i++) {
          if (allPlayin) {
              oscList[curr_uuid][i].play();
              oscList[curr_uuid][i].isPlaying = true;
          } else {
              oscList[curr_uuid][i].stop();
              oscList[curr_uuid][i].isPlaying = false;
          }
      }
    });
}
