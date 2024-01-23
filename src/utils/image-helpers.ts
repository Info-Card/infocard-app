import { BASE_URL } from '@/configs/constants';
import Compressor from 'compressorjs';

const { isNullOrEmpty } = require('./helpers');

/**
 * Gets the URL of a lead's profile image, falling back to the lead's image if no profile image is available.
 * @param {Object} lead - The lead object.
 * @returns {string} The URL of the lead's image.
 */
export const getLeadImageUrl = (lead: any) => {
  if (lead && lead.profile && !isNullOrEmpty(lead.profile.image)) {
    return `${BASE_URL}/v1/${lead.profile.image}`;
  } else if (lead && !isNullOrEmpty(lead.image)) {
    return `${BASE_URL}/v1/${lead.image}`;
  } else {
    return '/assets/images/placeholder/user.png';
  }
};

/**
 * Gets the URL of a profile image.
 * @param {Object} profile - The profile object.
 * @returns {string} The URL of the profile image.
 */
export const getProfileImageUrl = (profile: any) => {
  if (profile && !isNullOrEmpty(profile.image)) {
    return `${BASE_URL}/v1/${profile.image}`;
  } else {
    return '/assets/images/placeholder/user.png';
  }
};

/**
 * Gets the URL of a profile cover image.
 * @param {Object} profile - The profile object.
 * @returns {string} The URL of the profile cover image.
 */
export const getProfileCoverImageUrl = (profile: any) => {
  if (profile && !isNullOrEmpty(profile.cover)) {
    return `${BASE_URL}/v1/${profile.cover}`;
  } else {
    return '/assets/images/placeholder/cover.png';
  }
};

/**
 * Gets the URL of a platform image.
 * @param {Object} platform - The platform object.
 * @returns {string} The URL of the platform image.
 */
export const getPlatformImageUrl = (platform: any) => {
  if (platform && !isNullOrEmpty(platform.image)) {
    return `${BASE_URL}/v1/${platform.image}`;
  } else {
    return '/assets/images/placeholder/link.png';
  }
};

/**
 * Gets the URL of a link image, falling back to the platform image if no link image is available.
 * @param {Object} link - The link object.
 * @returns {string} The URL of the link image.
 */
export const getLinkImageUrl = (link: any) => {
  if (link && !isNullOrEmpty(link.image)) {
    return `${BASE_URL}/v1/${link.image}`;
  } else if (
    link &&
    link.platform &&
    !isNullOrEmpty(link.platform.image)
  ) {
    return `${BASE_URL}/v1/${link.platform.image}`;
  } else {
    return '/assets/images/placeholder/link.png';
  }
};

/**
 * Gets the URL of a product image.
 * @param {Object} product - The product object.
 * @returns {string} The URL of the product image.
 */
export const getProductImageUrl = (product: any) => {
  if (product && !isNullOrEmpty(product.image)) {
    return `${BASE_URL}/v1/${product.image}`;
  } else {
    return '/assets/images/placeholder/link.png';
  }
};

/**
 * Compresses the given image.
 * @param {File} image - The image to be compressed.
 * @returns {Promise<File>} A promise that resolves to the compressed image file.
 */
export const compressImage = (image: File) => {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      quality: 0.6,
      success(result) {
        const compressedFile = new File([result], image.name, {
          type: image.type,
          lastModified: image.lastModified,
        });
        resolve(compressedFile);
      },
      error(error) {
        console.error(error.message);
        reject(error);
      },
    });
  });
};

/**
 * convert the given file into fileList.
 * @param {File} file - The image to be compressed.
 * @returns {<File>} A fileList.
 */
export const fileToFileList = (file: File) => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  const modifiedFileList = dataTransfer.files;
  return modifiedFileList;
};
