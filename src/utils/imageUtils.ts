/**
 * Helper function to get image path
 * Works in both development and production (Netlify)
 * Images should be in public/assets folder
 * 
 * In Vite, files in public folder are served at root level
 * So /assets/image.jpg maps to public/assets/image.jpg
 */
export const getImagePath = (imageName: string): string => {
  // Remove leading slash if present
  const cleanName = imageName.startsWith('/') ? imageName.slice(1) : imageName;
  
  // Use absolute path from root - works in both dev and production
  // Vite serves public folder at root, so /assets/ works directly
  return `/assets/${cleanName}`;
};

/**
 * Get all image paths for a product
 */
export const getProductImages = (main: string, side: string, back: string, detail: string): {
  main: string;
  images: string[];
} => {
  return {
    main: getImagePath(main),
    images: [getImagePath(side), getImagePath(back), getImagePath(detail)],
  };
};

