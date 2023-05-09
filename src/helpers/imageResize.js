const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;

      let newWidth, newHeight;
      if (width > height) {
        newWidth = Math.min(width, 300);
        newHeight = newWidth * (height / width);
      } else {
        newHeight = Math.min(height, 300);
        newWidth = newHeight * (width / height);
      }

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;

      createImageBitmap(img, 0, 0, width, height, {
        resizeWidth: newWidth,
        resizeHeight: newHeight,
      })
        .then((bitmap) => {
          const ctx = canvas.getContext("2d");
          ctx.drawImage(bitmap, 0, 0, newWidth, newHeight);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, file.type);
        })
        .catch((err) => {
          reject(err);
        });
    };
    img.onerror = (err) => reject(err);
  });
};

export default resizeImage;
