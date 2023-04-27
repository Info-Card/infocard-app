// import pako from "pako";

// const compressFile = async (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const fileData = event.target.result;
//       const compressedData = pako.deflate(fileData);
//       const compressedBlob = new Blob([compressedData]);
//       const compressedFile = new File([compressedBlob], `${file.name}.gz`, {
//         type: "application/gzip",
//       });

//       resolve(compressedFile);
//     };

//     reader.onerror = (error) => {
//       reject(error);
//     };

//     return reader.readAsArrayBuffer(file);
//   });
// };

// export default compressFile;

import ImageFileResizer from "react-image-file-resizer";

const resizeImage = async (file) => {
  return new Promise((resolve, reject) => {
    const MAX_WIDTH = 500;
    const MAX_HEIGHT = 500;
    const QUALITY = 70;

    ImageFileResizer.imageFileResizer(
      file,
      MAX_WIDTH,
      MAX_HEIGHT,
      "JPEG",
      QUALITY,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};
export default resizeImage;
