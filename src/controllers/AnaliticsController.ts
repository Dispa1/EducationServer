import { Request, Response } from 'express';
import Analytics from '../models/AnaliticsModel';

export const createAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, userId } = req.body;

    if (!type || !userId) {
      res.status(400).json({ error: 'Необходимо указать тип и идентификатор пользователя' });
      return;
    }

    const analytics = await Analytics.create({
      type,
      userId,
    });

    res.status(201).json(analytics);
  } catch (error) {
    console.error('Ошибка при создании записи аналитики:', error);
    res.status(500).json({ error: 'Произошла ошибка при создании записи аналитики' });
  }
};