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

- The 24 `generator_material Nz` images are separate generator synthesis materials and are not included in this equipment set.
- Existing root-level assets such as `assets/generators/generator_mill_01.png` and `assets/generators/generator_mill_02.png` are legacy runtime assets and remain untouched.
- This import adds source assets only. It does not change runtime item configuration or playable-page behavior.
