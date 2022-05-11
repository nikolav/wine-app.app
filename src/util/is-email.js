
const reIsEmail = /^[^@]+@[^@]+\.[^@]+$/;
export const isEmail = email => reIsEmail.test(email);
