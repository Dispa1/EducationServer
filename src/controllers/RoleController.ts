import { Request, Response } from 'express';
import Role from '../models/RoleModel';

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Необходимо предоставить название для роли' });
    }

    const role = await Role.create({ name });

    res.status(201).json({ role });
  } catch (error) {
    console.error('Ошибка при создании роли:', error);
    res.status(500).json({ message: 'Произошла ошибка при создании роли' });
  }
};

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(roles);
  } catch (error) {
    console.error('Ошибка при получении ролей:', error);
    res.status(500).json({ message: 'Произошла ошибка при получении ролей' });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { roleId } = req.params;

    if (!roleId) {
      return res.status(400).json({ message: 'Необходимо предоставить ID роли' });
    }

    const deletedRole = await Role.destroy({ where: { id: roleId } });

    if (!deletedRole) {
      return res.status(404).json({ message: 'Роль не найдена' });
    }

    res.status(200).json({ message: 'Роль успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении роли:', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении роли' });
  }
};

