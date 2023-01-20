export const checkErrors = (errors) => {
  if (!errors.isEmpty()) {
    const errorMessage = errors.errors.map((error) => error.msg).join(". ");
    throw new Error(errorMessage);
  }
};
