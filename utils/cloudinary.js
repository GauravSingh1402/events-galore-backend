const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'events-galore', 
  api_key: '788493784475287', 
  api_secret: 'r4SlmvfwYHMkRMrNspFwX9a3y9I' 
});
  module.exports = { cloudinary };