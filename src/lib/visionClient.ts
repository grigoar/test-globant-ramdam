import vision from '@google-cloud/vision';

const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: 'google-cloud-vision-credentials-52ae90fa194e.json',
});

export default visionClient;
