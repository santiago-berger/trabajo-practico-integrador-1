import { matchedData } from "express-validator";
import { User, Profile, Article } from "../models/index.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: Profile, as: "profile" }],
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Profile, as: "profile" },
        { model: Article, as: "articles" },
      ],
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};

// POST /api/users
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, first_name, last_name } = matchedData(req);
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await Profile.create({ user_id: user.id, first_name, last_name });

    return res.status(201).json({ message: "Usuario creado con éxito", userId: user.id });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const data = matchedData(req, { locations: ["body"] });

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update(data);
    return res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
  }
};