import { createApi } from 'unsplash-js';

const unsplashClient = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
});

export default unsplashClient;

