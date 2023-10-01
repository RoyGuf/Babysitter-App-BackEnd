import cloudinary from '../../utils/cloudinaryConfig.js'

function uploadImage(data,name) {
    return cloudinary.uploader.upload(data, {
        folder: `babysitters-images/${name}`
    })
}

function uploadMultipleImages(images, name) {
    return new Promise((resolve, reject) => {
        const uploads = images.map((image) => uploadImage(image.url,name));
        Promise.all(uploads)
            .then((values) => {
                const media = values.map((image) => { return {public_id:image.public_id, url:image.secure_url}});
                resolve(media)
            })
            .catch((err) => reject(err))
    })
}

export default {
    uploadImage,
    uploadMultipleImages,
  }