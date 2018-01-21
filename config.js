require('dotenv-safe').load();

module.exports = {
  production: process.env.NODE_ENV === 'production',
  port: process.env.port || 8080,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
};
