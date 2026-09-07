import bcrypt from "bcrypt";

// hashea la contraseña antes de guardarla
export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// compara la contraseña ingresada con el hash guardado
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};