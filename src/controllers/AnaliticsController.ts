import { Request, Response } from 'express';
import Analytics from '../models/AnaliticsModel';
import { Op } from 'sequelize';

export const createAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, userId, userName, testId, testName, correctAnswersCount, incorrectAnswersCount } = req.body;

    if (!type || !userId || !userName || !testId || !testName) {
      res.status(400).json({ error: 'Необходимо указать тип, идентификатор пользователя, имя пользователя, идентификатор теста и название теста' });
      return;
    }

    const analytics = await Analytics.create({
      type,
      userId,
      userName,
      testId,
      testName,
      correctAnswersCount: correctAnswersCount,
      incorrectAnswersCount: incorrectAnswersCount,
    });

    res.status(201).json(analytics);
  } catch (error) {
    console.error('Ошибка при создании записи аналитики:', error);
    res.status(500).json({ error: 'Произошла ошибка при создании записи аналитики' });
  }
};

export const getAllAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const analytics = await Analytics.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(analytics);
  } catch (error) {
    console.error('Ошибка при получении записей аналитики:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении записей аналитики' });
  }
};

export const getAllAnalyticsForUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;

  try {
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);

    const analytics = await Analytics.findAll({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: lastWeekDate,
        },
      },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(analytics);
  } catch (error) {
    console.error('Ошибка при получении записей аналитики для пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении записей аналитики для пользователя' });
  }
};