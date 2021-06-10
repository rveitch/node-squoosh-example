// const { ImagePool } = require('@squoosh/lib'); // Doesn't work due to bug in package.json (https://github.com/GoogleChromeLabs/squoosh/issues/1034)
const { ImagePool } = require('@squoosh/lib/build/index.js'); // Work around
const fs = require('fs');

const RAW_IMAGES_FOLDER = './raw-images/'
const CONVERTED_IMAGES_FOLDER = './converted-images/'

async function convertImage(inputFilname, outputFilname) {
  const inputPath = `${RAW_IMAGES_FOLDER}${inputFilname}`;
  const outputPath = `${CONVERTED_IMAGES_FOLDER}${outputFilname}`;

  const imagePool = new ImagePool();
  const image = imagePool.ingestImage(inputPath);
  await image.decoded; //Wait until the image is decoded before running preprocessor
  console.info('Image Decoding Complete');

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
}

(async () => {
  console.time('convertImage');
  await convertImage('norma-teef-1.jpg', 'norma-teef-1-converted.jpg');
  console.timeEnd('convertImage');
})();

