import express from 'express';
import * as imagesController from '../controllers/imagesAnalyzerController';
import validate from '../middlewares/validate';
import { AnalyzeImageValidationSchema } from '../validations/images/AnalyzeImageValidation';

const router = express.Router();

router
  .route('/')
  .post(validate(AnalyzeImageValidationSchema), imagesController.analyzeImage);

export default router;

