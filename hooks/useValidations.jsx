export const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
};

export const validateFullName = (fullName) => {
  const nameRegex = /^[A-Za-z ']+$/;
  return nameRegex.test(fullName);
};

export const validatePassword = (password) => {
  const passwordRegex = /^[A-Za-zñÑ0-9.,_;@%+\-]+$/;
  return passwordRegex.test(password);
};

export const validatePhone = (phone) => {
  const nameRegex = /^[0-9]+$/;
  return nameRegex.test(phone);
};

export const validateComentario = (comentario) => {
  const nameRegex = /^[A-Za-záéíóúñÑ0-9._%+-@ ]+$/;
  return nameRegex.test(comentario);
};
