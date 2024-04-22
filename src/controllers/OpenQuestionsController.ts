import { Request, Response } from 'express';
import OpenQuestionsTest from '../models/OpenQuestionsTestModel';

export const createOpenQuestionTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, test, time } = req.body;

    if (!name || !description || !test || !time) {
      res.status(400).json({ error: 'Необходимо указать имя теста, описание, время и список вопросов' });
      return;
    }

    const openQuestion = await OpenQuestionsTest.create({
      name,
      description,
      test,
      time,
    });

    res.status(201).json(openQuestion);
  } catch (error) {
    console.error('Ошибка при создании теста с открытыми вопросами:', error);
    res.status(500).json({ error: 'Произошла ошибка при создании теста с открытыми вопросами' });
  }
};

export const deleteOpenQuestionTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { questionId } = req.params;

    const deletedQuestion = await OpenQuestionsTest.destroy({ where: { id: questionId } });

    if (!deletedQuestion) {
      res.status(404).json({ message: 'Вопрос не найден' });
      return;
    }

    res.status(200).json({ message: 'Вопрос успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении теста с открытыми вопросами:', error);
    res.status(500).json({ error: 'Произошла ошибка при удалении теста с открытыми вопросами' });
  }
};

export const getAllOpenQuestionsTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const openQuestions = await OpenQuestionsTest.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(openQuestions);
  } catch (error) {
    console.error('Ошибка при получении тестов с открытыми вопросами:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении тестов с открытыми вопросами' });
  }
};

export const getOpenQuestionTestById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { questionId } = req.params;

    const openQuestion = await OpenQuestionsTest.findByPk(questionId);

    if (!openQuestion) {
      res.status(404).json({ message: 'Тест с открытыми вопросами не найден' });
      return;
    }

    res.status(200).json(openQuestion);
  } catch (error) {
    console.error('Ошибка при получении теста с открытыми вопросами:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении теста с открытыми вопросами' });
  }
};