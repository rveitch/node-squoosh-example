# Node Squoosh Example
See more at https://github.com/GoogleChromeLabs/squoosh/tree/dev/libsquoosh

## Local Setup
- `$ git clone https://github.com/rveitch/node-squoosh-example.git`
- `$ npm install`
- Run `$ npm start` to initialize the app.

## Output
This example will log each step and give a before/after comparison similar to:
```
Image Decoding Complete
Image Pre-Processing Complete
Image Encoding Complete
Image Conversion Complete
Image Pool Closed
convertImage: 4.085s

Before - File Size: 2025 KiB, Image Size: 3024x4032
After - File Size: 167 KiB, Image Size: 1080x1440
```
