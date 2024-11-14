import { Basic } from 'unsplash-js/dist/methods/photos/types';
import unsplashClient from '../lib/unsplashClient';
import visionClient from '../lib/visionClient';

const searchImagesUnsplash = async (keyword: string): Promise<Basic[]> => {
  try {
    const response = await unsplashClient.search.getPhotos({
      query: keyword,
      page: 1,
      perPage: 10,
    });

    if (response.type === 'success') {
      return response.response.results;
    } else {
      throw new Error(`Error fetching images: ${response.errors}`);
    }
  } catch (error) {
    throw new Error(`An error occurred: ${error}`);
  }
};

const detectAndFilterImagesVision = async (
  images: Basic[],
  labels: string[]
) => {
  const matchingImages: any = [];
  const imagesVisionPromises = images.map((image: any) => {
    const imageUrl = image.urls.regular;
    return visionClient.labelDetection(imageUrl);
  });
  const results = await Promise.all(imagesVisionPromises);

  results.forEach(([result], i) => {
    const detectedLabels =
      result.labelAnnotations?.map((label) =>
        label.description?.toLocaleLowerCase()
      ) ?? [];

    const containsAllLabels = labels.every((label: string) =>
      detectedLabels.includes(label)
    );

    if (containsAllLabels) {
      matchingImages.push({
        image_url: images[i].urls.regular,
        labels: detectedLabels,
      });
    }
  });

  return matchingImages;
};

export { detectAndFilterImagesVision, searchImagesUnsplash };

