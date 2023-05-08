import imageFileResizer from "react-image-file-resizer";

export function resizeImage(file, maxWidth, maxHeight, callback) {
  imageFileResizer(
    file,
    maxWidth,
    maxHeight,
    "JPEG",
    100,
    0,
    (uri) => {
      callback(uri);
    },
    "base64"
  );
}
