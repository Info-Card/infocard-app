const toFormData = (data) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (key === "image") {
      if (value && value[0]) {
        formData.append("image", value[0]);
      }
    } else if (Array.isArray(value) && value.length > 0) {
      value.forEach((v) => {
        formData.append(`${key}[]`, v);
      });
    } else {
      formData.append(key, value);
    }
  }

  return formData;
};

export default toFormData;
