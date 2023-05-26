export const isNullOrEmpty = (value) => {
  return value === null || value === undefined || value === "";
};

// Check if a value is an array
export const isArray = (value) => {
  return Array.isArray(value);
};

// Check if a value is an object (excluding null and arrays)
export const isObject = (value) => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

// Check if a value is a function
export const isFunction = (value) => {
  return typeof value === "function";
};

// Check if a value is a string
export const isString = (value) => {
  return typeof value === "string";
};

// Check if a value is a number
export const isNumber = (value) => {
  return typeof value === "number" && isFinite(value);
};
