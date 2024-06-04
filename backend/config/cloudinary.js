const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dw9mqcrwa',
  api_key: '962184452579692',
  api_secret: 'F-N4u0JcksiQ3ugC-SBsAsIIGZ0'
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'rate-my-campus-react',
    allowedFormats: ['jpeg', 'jpg', 'png'],
  },
});

module.exports = {
  cloudinary,
  storage,
};
