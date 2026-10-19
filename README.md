# NONE — Game homepage

Single-page homepage built from the supplied studio-footer visual reference, including the exact logo, desktop eye-gaze video scrubbing, and mobile looping video. This is a homepage only; no game mechanics have been implemented.

## Setup

1. `npm install`
2. `npm run prepare-assets` — downloads the supplied video and fonts, and uses FFmpeg to produce the all-intra seek-friendly video.
3. `npm run dev`

`npm run build` automatically prepares assets before building. The source video is used unchanged, and the transcoded copy is served from `public/footer-scrub.mp4`. The copyright/design is user-supplied. The repository includes source code but does not commit large media binaries.

## Deployment

This repository is not automatically deployed by this change. Link the repository to your own Next.js hosting only when ready.
