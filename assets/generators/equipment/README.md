# Generator Equipment Assets

This directory contains the approved six-level generator equipment asset set: 6 categories x 6 levels, for 36 transparent PNG files in total.

## Categories

- `mill`
- `dairy`
- `meat`
- `spice`
- `fruit`
- `drink`

Each category contains levels `01` through `06`, named `generator_<category>_<level>.png`. The files are byte-for-byte copies of the user-approved transparent cutouts. Asset metadata and SHA-256 checksums are recorded in `manifest.json`.

## Scope Notes

- The approved synthesis chain uses 18 separate `v0.3` material images: stages `01` through `03` for each of the six categories. Stage `04` is not part of runtime and does not replace the approved Lv1 equipment art.
- Existing root-level assets such as `assets/generators/generator_mill_01.png` and `assets/generators/generator_mill_02.png` are legacy runtime assets and remain untouched.
- This import adds source assets only. It does not change runtime item configuration or playable-page behavior.
