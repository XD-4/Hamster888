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

export function getProductImage(productId) {
  return PRODUCT_IMAGE_IDS.has(productId) ? `/products/${productId}.jpg` : null;
}
