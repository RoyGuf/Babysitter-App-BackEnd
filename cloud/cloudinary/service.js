import cloudinary from '../../utils/cloudinaryConfig'

function uploadImage(data,name) {
    return cloudinary.uploader.upload(data, {
        folder: `babysitters-images/${name}`
    })
}

export default {
    uploadImage,
  }