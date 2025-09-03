// utils/imageUtils.js
export const getCloudinaryUrl = (img) => {
  if (!img) return null;
  // Use 'large' format first, fallback to other formats
  return img.formats?.large?.url || 
         img.formats?.medium?.url || 
         img.formats?.thumbnail?.url || 
         img.url || 
         null;
};
