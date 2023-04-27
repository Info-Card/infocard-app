const toFormData = (props) => {
  const data = props;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  console.log(data);
  const formData = new FormData();
  Object.entries(data).forEach((entry) => {
    const [key, value] = entry;
    if (key === "image") {
      if (value && value[0]) {
        formData.append("image", value[0]);
      }
    } else {
      formData.append(key, value);
    }
  });
  return { formData, config };
};

export default toFormData;
