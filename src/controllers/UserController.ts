import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import Role from '../models/RoleModel';

const generateAccessToken = (userId: string, username: string, fullName: string, role: string): string => {
  return jwt.sign({ userId, username, full_name: fullName, role }, process.env.SECRET!, { expiresIn: '1d' });
};

const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!);
};

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, full_name, email } = req.body;
    if (!username || !password || !full_name || !email) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const roleId = 2;
    const role = await Role.findByPk(roleId);
    if (!role) {
      res.status(400).json({ error: 'Role with provided id does not exist' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, full_name, email, role });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    const accessToken = generateAccessToken(user.id, user.username, user.full_name, user.role.name);
    const refreshToken = generateRefreshToken(user.id);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(401).json({ error: 'No refresh token provided' });
    return;
  }

  try {
    const decoded: any = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
    const accessToken = generateAccessToken(decoded.userId, decoded.username, decoded.full_name, decoded.role);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
    res.status(500).json({ message: 'Произошла ошибка при получении пользователей' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const userData = req.body;

    if (!userID || !Object.keys(userData).length) {
      return res.status(400).json({ message: 'Необходимо предоставить идентификатор пользователя и данные для обновления' });
    }

    const user = await User.findByPk(userID);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    Object.assign(user, userData);

    await user.save();

    res.status(200).json({ message: 'Пользователь успешно обновлен' });
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    res.status(500).json({ message: 'Произошла ошибка при обновлении пользователя', error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userID } = req.params;

    const deletedUser = await User.destroy({ where: { id: userID } });

    if (!deletedUser) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }

    res.status(200).json({ message: 'Пользователь успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении пользователя' });
  }
};