#!/usr/bin/env node
/** Original synthetic repair-complete cue: two soft wood taps and a warm chord. */
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const SAMPLE_RATE = 48000;
const DURATION = 1.45;
const FRAMES = Math.round(SAMPLE_RATE * DURATION);
const ROOT = path.resolve(__dirname, "../..");
const WAV_OUTPUT = path.join(ROOT, "output/repair-audio/流沙驿_修缮完成_v1.wav");
const ASSET_OUTPUT = path.join(ROOT, "game/playable-v0.1/assets/audio/repair-complete-v1.m4a");
const left = new Float64Array(FRAMES);
const right = new Float64Array(FRAMES);
let randomState = 0x72657061;

function random() {
  randomState ^= randomState << 13;
  randomState ^= randomState >>> 17;
  randomState ^= randomState << 5;
  return (randomState >>> 0) / 0x100000000;
}

function addVoice(start, duration, gain, pan, voice) {
  const startFrame = Math.round(start * SAMPLE_RATE);
  const endFrame = Math.min(FRAMES, startFrame + Math.round(duration * SAMPLE_RATE));
  const leftGain = Math.sqrt((1 - pan) / 2);
  const rightGain = Math.sqrt((1 + pan) / 2);
  for (let frame = startFrame; frame < endFrame; frame += 1) {
    const time = (frame - startFrame) / SAMPLE_RATE;
    const value = voice(time, duration) * gain;
    left[frame] += value * leftGain;
    right[frame] += value * rightGain;
  }
}

function addWoodTap(start, frequency, gain, pan) {
  let filteredNoise = 0;
  addVoice(start, 0.28, gain, pan, (time) => {
    filteredNoise = filteredNoise * 0.82 + (random() * 2 - 1) * 0.18;
    const body = Math.sin(2 * Math.PI * frequency * time)
      + 0.42 * Math.sin(2 * Math.PI * frequency * 1.57 * time + 0.3)
      + 0.18 * Math.sin(2 * Math.PI * frequency * 2.34 * time + 0.6);
    return (body + filteredNoise * 0.38) * Math.exp(-time * 19);
  });
}

function addWarmPluck(start, frequency, gain, pan) {
  addVoice(start, 1.05, gain, pan, (time, duration) => {
    const attack = 1 - Math.exp(-time / 0.006);
    const release = Math.min(1, (duration - time) / 0.18);
    let value = 0;
    for (let harmonic = 1; harmonic <= 7; harmonic += 1) {
      value += Math.sin(harmonic * Math.PI * 0.27) / harmonic ** 1.65
        * Math.sin(2 * Math.PI * frequency * harmonic * time + harmonic * 0.05)
        * Math.exp(-time * (1.7 + harmonic * 0.55));
    }
    return value * attack * release;
  });
}

addWoodTap(0.035, 174, 0.22, -0.2);
addWoodTap(0.19, 218, 0.17, 0.18);
// A compact D-major sonority gives completion warmth without sounding like a bell.
addWarmPluck(0.30, 293.665, 0.16, -0.16);
addWarmPluck(0.39, 369.994, 0.125, 0.04);
addWarmPluck(0.48, 440.000, 0.105, 0.18);

const dryLeft = Float64Array.from(left);
const dryRight = Float64Array.from(right);
for (const [delaySeconds, gain] of [[0.041, 0.11], [0.073, 0.065], [0.127, 0.032]]) {
  const delayFrames = Math.round(delaySeconds * SAMPLE_RATE);
  for (let frame = delayFrames; frame < FRAMES; frame += 1) {
    left[frame] += dryRight[frame - delayFrames] * gain;
    right[frame] += dryLeft[frame - delayFrames] * gain;
  }
}

let peak = 0;
let energy = 0;
for (let frame = 0; frame < FRAMES; frame += 1) {
  peak = Math.max(peak, Math.abs(left[frame]), Math.abs(right[frame]));
  energy += left[frame] ** 2 + right[frame] ** 2;
}
const scale = 10 ** (-4 / 20) / Math.max(peak, 1e-9);
const pcm = Buffer.alloc(FRAMES * 4);
for (let frame = 0; frame < FRAMES; frame += 1) {
  pcm.writeInt16LE(Math.round(left[frame] * scale * 32767), frame * 4);
  pcm.writeInt16LE(Math.round(right[frame] * scale * 32767), frame * 4 + 2);
}
const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + pcm.length, 4);
header.write("WAVEfmt ", 8);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20);
header.writeUInt16LE(2, 22);
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(SAMPLE_RATE * 4, 28);
header.writeUInt16LE(4, 32);
header.writeUInt16LE(16, 34);
header.write("data", 36);
header.writeUInt32LE(pcm.length, 40);
fs.mkdirSync(path.dirname(WAV_OUTPUT), { recursive: true });
fs.writeFileSync(WAV_OUTPUT, Buffer.concat([header, pcm]));
execFileSync("afconvert", [WAV_OUTPUT, ASSET_OUTPUT, "-f", "m4af", "-d", "aac", "-b", "128000"]);
console.log(JSON.stringify({
  wavPath: WAV_OUTPUT,
  assetPath: ASSET_OUTPUT,
  durationSeconds: DURATION,
  peakDbfs: -4,
  rmsDbfs: 20 * Math.log10(Math.sqrt(energy / (FRAMES * 2)) * scale),
}, null, 2));
