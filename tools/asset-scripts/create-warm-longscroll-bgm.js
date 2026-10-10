#!/usr/bin/env node
// Original synthetic soft plucked strings, D major pentatonic, 80 BPM.
// Circular note tails and short room reflections allow a continuous loop.
const fs = require('node:fs');
const path = require('node:path');
const SR = 48000, BEAT = .75, SECONDS = 48, N = SR * SECONDS;
const left = new Float64Array(N), right = new Float64Array(N);
function pluck(beat, midi, gain, pan, melody = false) {
  const f = 440 * 2 ** ((midi - 69) / 12);
  const duration = melody ? 3.3 : 2.6;
  const start = Math.round(beat * BEAT * SR);
  for (let i = 0; i < duration * SR; i++) {
    const t = i / SR;
    let value = 0;
    for (let h = 1; h <= 7; h++) {
      value += Math.sin(h * Math.PI * .28) / h ** 1.7
        * Math.sin(2 * Math.PI * f * h * t)
        * Math.exp(-t * ((melody ? 1.15 : 1.65) + h * .32));
    }
    value *= gain * (1 - Math.exp(-t / .007)) * Math.min(1, (duration - t) / .16);
    const index = (start + i) % N;
    left[index] += value * Math.sqrt((1 - pan) / 2);
    right[index] += value * Math.sqrt((1 + pan) / 2);
  }
}
// Warm major chords, no low drones, breath, bells or pitch modulation.
const D = [50,57,66], G = [55,62,71], A = [57,64,69];
[D,D,G,A,D,G,A,D,G,D,G,A,D,G,A,D].forEach((chord,bar) => {
  [0,1,2,1].forEach((degree,beat) => {
    pluck(bar * 4 + beat + .025, chord[degree], beat === 0 ? .12 : .075, -.24);
  });
});
const phrases = [
  [[66,1],[69,1],[71,1],[69,1]], [[66,1.5],[64,.5],[62,2]],
  [[64,1],[66,1],[69,1],[66,1]], [[64,2],[62,1],[64,1]],
  [[66,1],[69,1],[74,1.5],[71,.5]], [[69,1],[66,1],[64,2]],
  [[64,1],[66,1],[64,1],[69,1]], [[66,1],[64,1],[62,2]],
  [[71,1.5],[69,.5],[66,1],[69,1]], [[74,2],[71,1],[69,1]],
  [[66,1],[69,1],[71,1],[69,1]], [[64,1.5],[66,.5],[69,2]],
  [[66,1],[69,1],[74,1],[71,1]], [[69,1.5],[66,.5],[64,2]],
  [[66,1],[64,1],[69,1],[64,1]], [[66,1],[64,1],[62,2]],
];
phrases.forEach((phrase,bar) => {
  let beat = bar * 4;
  phrase.forEach(([note,length],index) => {
    pluck(beat,note,index === 0 ? .24 : .205,.12,true);
    beat += length;
  });
});
const dryL = Float64Array.from(left), dryR = Float64Array.from(right);
for (const [seconds,gain] of [[.029,.085],[.053,.055],[.089,.025]]) {
  const delay = Math.round(seconds * SR);
  for (let i = 0; i < N; i++) {
    const source = (i - delay + N) % N;
    left[i] += dryR[source] * gain;
    right[i] += dryL[source] * gain;
  }
}
let peak = 0, energy = 0;
for (let i = 0; i < N; i++) {
  peak = Math.max(peak,Math.abs(left[i]),Math.abs(right[i]));
  energy += left[i] ** 2 + right[i] ** 2;
}
const scale = 10 ** (-5 / 20) / peak;
const wav = Buffer.alloc(44 + N * 4);
wav.write('RIFF',0); wav.writeUInt32LE(wav.length - 8,4); wav.write('WAVEfmt ',8);
wav.writeUInt32LE(16,16); wav.writeUInt16LE(1,20); wav.writeUInt16LE(2,22);
wav.writeUInt32LE(SR,24); wav.writeUInt32LE(SR * 4,28);
wav.writeUInt16LE(4,32); wav.writeUInt16LE(16,34);
wav.write('data',36); wav.writeUInt32LE(N * 4,40);
for (let i = 0; i < N; i++) {
  wav.writeInt16LE(Math.round(left[i] * scale * 32767),44 + i * 4);
  wav.writeInt16LE(Math.round(right[i] * scale * 32767),46 + i * 4);
}
const out = path.resolve(__dirname,'../../output/longscroll-audio/流沙驿_长卷暖弦_v2.wav');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,wav);
console.log(JSON.stringify({path:out,seconds:SECONDS,peakDbfs:-5,
  rmsDbfs:20 * Math.log10(Math.sqrt(energy / (2 * N)) * scale),
  seamDelta:Math.max(Math.abs(left[0]-left[N-1]),Math.abs(right[0]-right[N-1])) * scale,
},null,2));
