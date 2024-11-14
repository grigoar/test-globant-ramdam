import { NextFunction, Request, Response } from 'express';
import {
  detectAndFilterImagesVision,
  searchImagesUnsplash,
} from '../services/imagesAnalyzerService';

const analyzeImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { keyword, labels } = req.body;

    const images = await searchImagesUnsplash(keyword);

    if (!images) {
      return new Error('No images found with this keyword');
    }

    const lowerCaseLabels = labels.map((label: string) => label.toLowerCase());

    const matchingImages = await detectAndFilterImagesVision(
      images,
      lowerCaseLabels
    );

    res.status(201).json({
      keyword,
      matches: matchingImages,
    });
  } catch (error: any) {
    return next(error);
  }
};

export { analyzeImage };

