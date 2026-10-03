// Photorealistic studio renders stored in /public/products/<id>.jpg
// Add a product id here once its render exists; others fall back to SVG illustrations.
export const PRODUCT_IMAGE_IDS = new Set([
  'esp32-s3-pro',
  'rpi5-8gb',
  'arduino-giga-wifi',
  'lidar-tof-matrix',
  'bme688-ai-env',
  'lorawan-node-pro',
  'nbiot-lte-cellular',
  'smart-bms-gan-pack',
  'brushless-foc-actuator',
  'lcd-0802-blue',
  'infrared-10nk',
  'dcdc-stepup-1200w',
  'pca9685-16ch',
]);

const availableImages = Array.from(PRODUCT_IMAGE_IDS);

export function getProductImage(productId) {
  if (PRODUCT_IMAGE_IDS.has(productId)) {
    return `/products/${productId}.jpg`;
  }
  
  // Temporary: Map missing products to existing photorealistic images
  // using a simple stable hash so the same product always gets the same image.
  let hash = 0;
  for (let i = 0; i < productId.length; i++) {
    hash = productId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % availableImages.length;
  return `/products/${availableImages[index]}.jpg`;
}
