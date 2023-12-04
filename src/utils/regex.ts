export const urlRegex =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/[^\s]*)?$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\d{10}$/;
export const titleRegex = /^.{1,32}$/;
export const youtubeUrlRegex =
  /^(https?:\/\/)?((www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S*?)$/;
