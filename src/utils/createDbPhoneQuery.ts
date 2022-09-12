export const createDbPhoneQuery = (phone: string) => {
  const trimmedNumber = phone.slice(-9);
  return new RegExp('(?!\\+48)' + trimmedNumber);
};
