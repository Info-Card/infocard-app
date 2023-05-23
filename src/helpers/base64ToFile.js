const base64ToFile = (base64Data) => {
  const base64Regex = /^data:image\/(\w+);base64,/;
  const matches = base64Data.match(base64Regex);
  if (!matches) {
    throw new Error(
      "Invalid Base64 format. Expected data URL with image data."
    );
  }

  const mimeType = matches[1];
  const byteCharacters = atob(base64Data.split(",")[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const slice = byteCharacters.slice(offset, offset + 1024);
    const byteNumbers = new Array(slice.length);

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: `image/${mimeType}` });
  const file = new File([blob], `image.${mimeType}`, {
    type: `image/${mimeType}`,
    lastModified: Date.now(),
  });

  return file;
};

export default base64ToFile;
