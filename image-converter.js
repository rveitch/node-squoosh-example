// const { ImagePool } = require('@squoosh/lib'); // Doesn't work due to bug in package.json (https://github.com/GoogleChromeLabs/squoosh/issues/1034)
const { ImagePool } = require('@squoosh/lib/build/index.js'); // Work around
const ExifTool = require("exiftool-vendored").exiftool
const fs = require('fs');

const RAW_IMAGES_FOLDER = `${__dirname}/raw-images/`;
const CONVERTED_IMAGES_FOLDER = `${__dirname}/converted-images/`;

async function convertImage(inputFilname, outputFilname) {
  const inputPath = `${RAW_IMAGES_FOLDER}${inputFilname}`;
  const outputPath = `${CONVERTED_IMAGES_FOLDER}${outputFilname}`;

  console.time('convertImage');
  const imagePool = new ImagePool();
  const image = imagePool.ingestImage(inputPath);
  await image.decoded; //Wait until the image is decoded before running preprocessor
  console.info('\nImage Decoding Complete');

  // Pre-process
  const preprocessOptions = {
    resize: {
      enabled: true,
      width: 1080,
    }
  };
  await image.preprocess(preprocessOptions);
  console.info('Image Pre-Processing Complete');

  // Encode
  const encodeOptions = {
    mozjpeg: {
      quality: 85,
    },
  };
  await image.encode(encodeOptions);
  console.info('Image Encoding Complete');

  const rawEncodedImage = (await image.encodedWith.mozjpeg).binary;

  //await fs.writeFile(outputPath, rawEncodedImage);
  await fs.writeFileSync(outputPath, rawEncodedImage);
  console.info('Image Conversion Complete');

  await imagePool.close();
  console.info('Image Pool Closed');
  console.timeEnd('convertImage');

  const { FileSize: FileSizeBefore, ImageSize: ImageSizeBefore } = await ExifTool.read(inputPath);
  console.log(`\nBefore - File Size: ${FileSizeBefore}, Image Size: ${ImageSizeBefore}`);

  const { FileSize: FileSizeAfter, ImageSize: After } = await ExifTool.read(outputPath);
  console.log(`After - File Size: ${FileSizeAfter}, Image Size: ${After}\n`);
}

(async () => {
  await convertImage('norma-teef-1.jpg', 'norma-teef-1-converted.jpg');
})();

