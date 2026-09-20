"""Original synthesized opening sketch; no samples or recorded instruments.

Render a 14.5-second stereo WAV matching the opening cinematic's timeline.
Requires NumPy. Output stays outside the game's production assets until approved.
"""
from pathlib import Path
import json
import wave
import numpy as np

SR = 48000
DURATION = 14.5
N = round(SR * DURATION)
RNG = np.random.default_rng(190926)
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "output" / "opening-audio"
OUT.mkdir(parents=True, exist_ok=True)
mix = np.zeros((N, 2), dtype=np.float64)
room = np.zeros_like(mix)


def noise(n, low, high):
    frequencies = np.fft.rfftfreq(n, 1 / SR)
    spectrum = np.fft.rfft(RNG.normal(size=n))
    shape = np.exp(-((frequencies / high) ** 4))
    if low:
        shape *= 1 - np.exp(-((frequencies / low) ** 4))
    signal = np.fft.irfft(spectrum * shape, n=n)
    return signal / max(np.std(signal), 1e-8)


def envelope(n, attack=.02, release=.15):
    env = np.ones(n)
    a, r = min(n, round(attack * SR)), min(n, round(release * SR))
    env[:a] *= np.sin(np.linspace(0, np.pi / 2, a)) ** 2
    env[-r:] *= np.cos(np.linspace(0, np.pi / 2, r)) ** 2
    return env


def add(signal, start, gain=1, pan=0, wet=.2):
    offset = round(start * SR)
    length = min(len(signal), N - offset)
    stereo = signal[:length, None] * gain * np.array([
        np.sqrt((1 - pan) / 2), np.sqrt((1 + pan) / 2)
    ])
    mix[offset:offset + length] += stereo
    room[offset:offset + length] += stereo * wet


# A slow, irregular wind bed with space left around the door and ignition.
t = np.arange(N) / SR
wind_level = np.interp(t, [0, .6, 3.5, 4.5, 6, 7.3, 9.2, 11, 14.5],
                       [0, .022, .032, .017, .01, .016, .012, .007, 0])
gust = .7 + .16 * np.sin(2 * np.pi * .23 * t) + .13 * np.sin(2 * np.pi * .41 * t + 1)
for channel in range(2):
    mix[:, channel] += noise(N, 80, 950) * wind_level * gust


def flute(start, duration, frequency, gain):
    n = round(duration * SR)
    t = np.arange(n) / SR
    vibrato = .0018 * np.sin(2 * np.pi * 4.3 * t) * np.minimum(t / .7, 1)
    phase = 2 * np.pi * np.cumsum(frequency * (1 + vibrato)) / SR
    tone = (np.sin(phase) + .15 * np.sin(2 * phase + .2)
            + .045 * np.sin(3 * phase + .5))
    breath = noise(n, 700, 2900) * .075
    env = envelope(n, .55, .85) * (.94 + .06 * np.sin(2 * np.pi * .8 * t))
    add((tone + breath) * env, start, gain, -.14, .4)


flute(.65, 2.3, 220, .066)
flute(2.7, 1.85, 196, .044)

# Muted timber knock and pitched friction of a slow wooden door.
n = round(.19 * SR)
t = np.arange(n) / SR
knock = (np.sin(2 * np.pi * 116 * t) + .32 * np.sin(2 * np.pi * 247 * t))
knock = (knock + .17 * noise(n, 170, 1800)) * np.exp(-t * 30) * envelope(n, .003, .03)
add(knock, 4.25, .09, -.3, .12)
n = round(1.45 * SR)
t = np.arange(n) / SR
frequency = 105 + 38 * np.sin(np.pi * t / 1.45) + 4 * np.sin(2 * np.pi * 8 * t)
phase = 2 * np.pi * np.cumsum(frequency) / SR
creak = sum(np.sin(h * phase) / h ** 1.4 for h in range(1, 8))
creak += .25 * noise(n, 200, 1500)
add(creak * envelope(n, .18, .36), 4.6, .034, -.2, .17)


def flint(start, gain):
    n = round(.16 * SR)
    t = np.arange(n) / SR
    impact = noise(n, 1800, 6500) * np.exp(-t * 74)
    impact += .24 * np.sin(2 * np.pi * 2800 * t) * np.exp(-t * 85)
    add(impact * envelope(n, .001, .025), start, gain, .2, .09)


flint(7.85, .082)
flint(9.4, .095)
# Ignition breath followed by small embers rather than a roaring fire.
n = round(1.35 * SR)
t = np.arange(n) / SR
add(noise(n, 180, 1800) * envelope(n, .15, .85), 9.45, .021, .12, .14)
n = N - round(9.55 * SR)
t = np.arange(n) / SR
add(noise(n, 250, 3300) * envelope(n, .6, 1.1), 9.55, .006, .1, .08)
for start in [9.82, 10.14, 10.57, 11.36, 12.04, 12.72, 13.05]:
    n = round(.055 * SR)
    t = np.arange(n) / SR
    add(noise(n, 900, 4700) * np.exp(-t * 125) * envelope(n, .001, .012),
        start, .009, float(RNG.uniform(-.25, .4)), .05)


def pluck(start, frequency, gain, pan):
    n = round(3.4 * SR)
    t = np.arange(n) / SR
    signal = np.zeros(n)
    # Slightly inharmonic, rapidly darkening plucked-string resonances.
    for h in range(1, 13):
        partial = frequency * h * np.sqrt(1 + .00006 * h * h)
        amp = np.sin(h * np.pi * .23) / h ** 1.15
        signal += amp * np.sin(2 * np.pi * partial * t) * np.exp(-t * (.9 + .37 * h))
    signal += .04 * noise(n, 1200, 5200) * np.exp(-t * 100)
    add(signal * envelope(n, .002, .5), start, gain, pan, .38)


# Open fifth, then a warm pentatonic answer as the chapter title appears.
pluck(10.55, 293.6648, .15, -.19)
pluck(11.2, 440, .125, .18)
pluck(11.95, 587.3295, .1, -.08)
pluck(12.7, 659.2551, .068, .18)

# Diffuse stereo room tail, applied only to the wet send (no feedback runaway).
for delay, level in [(.061, .22), (.097, .18), (.149, .145), (.223, .11),
                     (.337, .085), (.487, .055), (.661, .04), (.887, .025)]:
    shift = round(delay * SR)
    mix[shift:] += room[:-shift, ::-1] * level
mix *= envelope(N, .08, .65)[:, None]
mix -= np.mean(mix, axis=0)
peak = np.max(np.abs(mix))
mix *= 10 ** (-3 / 20) / peak
assert np.isfinite(mix).all()
pcm = (np.clip(mix, -1, 1) * 32767).round().astype('<i2')
target = OUT / '流沙驿_第一缕炉烟_开场试听_v1.wav'
with wave.open(str(target), 'wb') as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(SR)
    wav.writeframes(pcm.tobytes())
print(json.dumps({'path': str(target), 'duration_seconds': N / SR,
                  'sample_rate': SR, 'channels': 2,
                  'peak_dbfs': float(20 * np.log10(np.max(np.abs(mix)))),
                  'rms_dbfs': float(20 * np.log10(np.sqrt(np.mean(mix ** 2)))),
                  'clipped_samples': int(np.sum(np.abs(mix) >= 1))}, ensure_ascii=False, indent=2))
