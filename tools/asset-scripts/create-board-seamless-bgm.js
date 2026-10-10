#!/usr/bin/env node
/**
 * Turn the existing board cue into a seamless loop without changing its music.
 * The final 0.8 seconds fold into the opening 0.8 seconds with an equal-power
 * crossfade, then that duplicated tail is removed from the exported loop.
 */
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "../..");
const SOURCE = path.join(ROOT, "game/playable-v0.1/assets/audio/bgm.m4a");
const OUTPUT_DIR = path.join(ROOT, "output/board-audio");
const OUTPUT = path.join(OUTPUT_DIR, "流沙驿_棋盘循环衔接_v2.wav");
const ASSET_OUTPUT = path.join(ROOT, "game/playable-v0.1/assets/audio/bgm-board-seamless-v2.wav");
const CROSSFADE_SECONDS = 0.8;

function readWave(buffer) {
  let cursor = 12;
  let channels = 0;
  let sampleRate = 0;
  let bitsPerSample = 0;
  let dataOffset = 0;
  let dataSize = 0;
  while (cursor + 8 <= buffer.length) {
    const id = buffer.toString("ascii", cursor, cursor + 4);
    const size = buffer.readUInt32LE(cursor + 4);
    if (id === "fmt ") {
      channels = buffer.readUInt16LE(cursor + 10);
      sampleRate = buffer.readUInt32LE(cursor + 12);
      bitsPerSample = buffer.readUInt16LE(cursor + 22);
    } else if (id === "data") {
      dataOffset = cursor + 8;
      dataSize = size;
      break;
    }
    cursor += 8 + size + (size & 1);
  }
  if (channels !== 2 || bitsPerSample !== 16 || !dataOffset) {
    throw new Error("Expected decoded 16-bit stereo PCM WAV");
  }
  const frames = dataSize / (channels * 2);
  const samples = [new Float64Array(frames), new Float64Array(frames)];
  for (let frame = 0; frame < frames; frame += 1) {
    for (let channel = 0; channel < channels; channel += 1) {
      samples[channel][frame] = buffer.readInt16LE(dataOffset + (frame * channels + channel) * 2) / 32768;
    }
  }
  return { channels, sampleRate, frames, samples };
}

function writeWave({ sampleRate, samples }) {
  const frames = samples[0].length;
  const output = Buffer.alloc(44 + frames * 4);
  output.write("RIFF", 0);
  output.writeUInt32LE(output.length - 8, 4);
  output.write("WAVEfmt ", 8);
  output.writeUInt32LE(16, 16);
  output.writeUInt16LE(1, 20);
  output.writeUInt16LE(2, 22);
  output.writeUInt32LE(sampleRate, 24);
  output.writeUInt32LE(sampleRate * 4, 28);
  output.writeUInt16LE(4, 32);
  output.writeUInt16LE(16, 34);
  output.write("data", 36);
  output.writeUInt32LE(frames * 4, 40);
  for (let frame = 0; frame < frames; frame += 1) {
    for (let channel = 0; channel < 2; channel += 1) {
      const value = Math.max(-1, Math.min(1, samples[channel][frame]));
      output.writeInt16LE(Math.round(value * 32767), 44 + (frame * 2 + channel) * 2);
    }
  }
  return output;
}

const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "silkroad-board-loop-"));
const decodedPath = path.join(temporaryDirectory, "board-source.wav");
execFileSync("afconvert", [SOURCE, decodedPath, "-f", "WAVE", "-d", "LEI16@44100"]);
const decoded = readWave(fs.readFileSync(decodedPath));
const crossfadeFrames = Math.round(CROSSFADE_SECONDS * decoded.sampleRate);
const outputFrames = decoded.frames - crossfadeFrames;
const outputSamples = [new Float64Array(outputFrames), new Float64Array(outputFrames)];

for (let channel = 0; channel < 2; channel += 1) {
  for (let frame = 0; frame < outputFrames; frame += 1) {
    if (frame < crossfadeFrames) {
      const progress = frame / Math.max(1, crossfadeFrames - 1);
      const tailGain = Math.cos(progress * Math.PI / 2);
      const headGain = Math.sin(progress * Math.PI / 2);
      outputSamples[channel][frame] =
        decoded.samples[channel][outputFrames + frame] * tailGain
        + decoded.samples[channel][frame] * headGain;
    } else {
      outputSamples[channel][frame] = decoded.samples[channel][frame];
    }
  }
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
const renderedWave = writeWave({ sampleRate: decoded.sampleRate, samples: outputSamples });
fs.writeFileSync(OUTPUT, renderedWave);
fs.writeFileSync(ASSET_OUTPUT, renderedWave);
console.log(JSON.stringify({
  path: OUTPUT,
  assetPath: ASSET_OUTPUT,
  sourceSeconds: decoded.frames / decoded.sampleRate,
  loopSeconds: outputFrames / decoded.sampleRate,
  crossfadeSeconds: CROSSFADE_SECONDS,
}, null, 2));
