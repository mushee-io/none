import { mkdir, stat, rename, rm } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const root = process.cwd();
const sourceVideo = path.join(root, 'public/footer-background.mp4');
const scrubVideo = path.join(root, 'public/footer-scrub.mp4');

const assets = [
  ['https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68370ddd1dd328d7914d6512_DMSans-Regular.woff2', 'public/fonts/DMSans-Regular.woff2'],
  ['https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68370ddd06d737200122a835_Epilogue-Black.woff2', 'public/fonts/Epilogue-Black.woff2'],
  ['https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260908_073327_03643c0a-db33-417a-ae8f-4a39259c7f9c.mp4', 'public/footer-background.mp4']
];

async function existsNonempty(filename) {
  try { return (await stat(filename)).size > 0; }
  catch { return false; }
}

async function downloadExact(url, relativeFile) {
  const destination = path.join(root, relativeFile);
  if (await existsNonempty(destination)) {
    console.log(`Already present: ${relativeFile}`);
    return;
  }
  await mkdir(path.dirname(destination), { recursive: true });
  const tmp = destination + '.download';
  const response = await fetch(url, { signal: AbortSignal.timeout(120_000) });
  if (!response.ok || !response.body) {
    throw new Error(`Cannot download original asset (${response.status}): ${url}`);
  }
  try {
    await pipeline(Readable.fromWeb(response.body), createWriteStream(tmp));
    await rename(tmp, destination);
    console.log(`Downloaded ${relativeFile}`);
  } catch (error) {
    await rm(tmp, { force: true });
    throw error;
  }
}

function ffmpegBin() {
  try { return require('ffmpeg-static') || 'ffmpeg'; }
  catch { return 'ffmpeg'; }
}

async function makeScrubVideo() {
  if (await existsNonempty(scrubVideo)) {
    console.log('Already present: public/footer-scrub.mp4');
    return;
  }
  await new Promise((resolve, reject) => {
    const ffmpeg = spawn(ffmpegBin(), [
      '-hide_banner', '-loglevel', 'error',
      '-i', sourceVideo, '-an', '-c:v', 'libx264',
      '-preset', 'fast', '-crf', '20', '-g', '1',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
      scrubVideo
    ], { stdio: 'inherit' });
    ffmpeg.on('error', reject);
    ffmpeg.on('close', code => code === 0 ? resolve() : reject(new Error(`FFmpeg failed with exit code ${code}`)));
  });
  console.log('Created original-frame all-intra public/footer-scrub.mp4');
}

try {
  for (const [url, destination] of assets) await downloadExact(url, destination);
  await makeScrubVideo();
} catch (error) {
  console.error('Asset preparation failed. Check asset URLs and build network access.', error);
  process.exitCode = 1;
}
