import express from 'express';

import ImageController from '../controllers/ImageController.js';
import authorized from '../middleware/authorized.js';
import uploadImage from '../middleware/multerImageUpload.js';
import uploadImageRequest from '../middleware/requests/uploadImageRequest.js';
import imageRequest from '../middleware/requests/images/imageRequest.js';
import isAdmin from '../middleware/isAdmin.js';
import { handleAsyncApiError } from '../utils/handleErrors.js';

const router = express.Router();

// Get Image
router.get('/image/:id', handleAsyncApiError(ImageController.getImage));

// Upload Image
router.post(
  '/image/:imageableId',
  authorized,
  isAdmin,
  uploadImage.single('file'),
  uploadImageRequest,
  imageRequest,
  handleAsyncApiError(ImageController.uploadImage),
);

// Update user profile picture
router.put(
  '/image/user',
  authorized,
  isAdmin,
  uploadImage.single('file'),
  uploadImageRequest,
  handleAsyncApiError(ImageController.updateUserImg),
);

// Delete Image
router.delete(
  '/image/:imageableId',
  authorized,
  isAdmin,
  imageRequest,
  handleAsyncApiError(ImageController.deleteImage),
);

export default router;
