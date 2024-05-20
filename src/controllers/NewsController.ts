import { Request, Response } from 'express';
import News from '../models/News';
import sequelize from 'sequelize';

export const createNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, image, text, type } = req.body;

    if (!name || !text || !type) {
      res.status(400).json({ message: 'Все поля (name, text, type) обязательны для создания новости' });
      return;
    }

    const news = await News.create({ name, image, text, type });

    res.status(201).json({ message: 'Новость успешно создана', news });
  } catch (error) {
    console.error('Ошибка при создании новости:', error);
    res.status(500).json({ message: 'Произошла ошибка при создании новости' });
  }
};

export const deleteNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const news = await News.findByPk(id);

    if (!news) {
      res.status(404).json({ message: 'Новость не найдена' });
      return;
    }

    await news.destroy();

    res.status(200).json({ message: 'Новость успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении новости:', error);
    res.status(500).json({ message: 'Произошла ошибка при удалении новости' });
  }
};

export const getAllNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const allNews = await News.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'name',
        'image',
        [sequelize.literal('SUBSTRING(text, 1, 255)'), 'text'],
        'createdAt',
        [
          sequelize.literal(`CONCAT('${process.env.BASE_URL}', image)`),
          'imageUrl'
        ]
      ],
      raw: true
    });

    res.status(200).json(allNews);
  } catch (error) {
    console.error('Ошибка при получении всех новостей:', error);
    res.status(500).json({ message: 'Произошла ошибка при получении всех новостей' });
  }
};
