const { isNullOrEmpty } = require("./helpers");

/**
 * Gets the URL of a lead's profile image, falling back to the lead's image if no profile image is available.
 * @param {Object} lead - The lead object.
 * @returns {string} The URL of the lead's image.
 */
export const getLeadImageUrl = (lead) => {
  if (lead && lead.profile && !isNullOrEmpty(lead.profile.image)) {
    return `${process.env.REACT_APP_BASE_URL}/v1/${lead.profile.image}`;
  } else if (lead && !isNullOrEmpty(lead.image)) {
    return `${process.env.REACT_APP_BASE_URL}/v1/${lead.image}`;
  } else {
    return "/assets/images/placeholder/user.png";
  }
};

/**
 * Gets the URL of a profile image.
 * @param {Object} profile - The profile object.
 * @returns {string} The URL of the profile image.
 */
export const getProfileImageUrl = (profile) => {
  if (profile && !isNullOrEmpty(profile.image)) {
    return `${process.env.REACT_APP_BASE_URL}/v1/${profile.image}`;
  } else {
    return "/assets/images/placeholder/user.png";
  }
};

/**
 * Gets the URL of a profile cover image.
 * @param {Object} profile - The profile object.
 * @returns {string} The URL of the profile cover image.
 */
export const getProfileCoverImageUrl = (profile) => {
  if (profile && !isNullOrEmpty(profile.cover)) {
    return `${process.env.REACT_APP_BASE_URL}/v1/${profile.cover}`;
  } else {
    return "/assets/images/placeholder/cover.png";
  }
};

/**
 * Gets the URL of a platform image.
 * @param {Object} platform - The platform object.
 * @returns {string} The URL of the platform image.
 */
export const getPlatformImageUrl = (platform) => {
  if (platform && !isNullOrEmpty(platform.image)) {
    return `${process.env.REACT_APP_BASE_URL}/v1/${platform.image}`;
  } else {
    return "/assets/images/placeholder/link.png";
  }
};

/**
 * Gets the URL of a link image, falling back to the platform image if no link image is available.
 * @param {Object} link - The link object.
 * @returns {string} The URL of the link image.
 */
export const getLinkImageUrl = (link) => {
  if (link && !isNullOrEmpty(link.image)) {
    return `${process.env.REACT_APP_BASE_URL}/v1/${link.image}`;
  } else if (link && link.platform && !isNullOrEmpty(link.platform.image)) {
    return `${process.env.REACT_APP_BASE_URL}/v1/${link.platform.image}`;
  } else {
    return "/assets/images/placeholder/link.png";
  }
};
