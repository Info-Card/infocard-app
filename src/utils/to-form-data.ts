export const toFormData = (obj: { [key: string]: any }): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    formData.append(key, value);
  }

  return formData;
};
