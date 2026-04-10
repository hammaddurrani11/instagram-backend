const ImageKit = require('@imagekit/nodejs').ImageKit;

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer, fileName) {
    return imagekit.files.upload({
        file: buffer.toString('base64'),
        fileName,
        folder: "/Instagram",
    });
}

module.exports = { uploadFile };