import { Request, Response } from 'express';
import ClosedQuestionTestModel from '../models/ClosedQuestionTestModel';

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  questionText: string;
  options: Option[];
}

export const createClosedQuestionTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, test, time } = req.body;

    if (!name || !description || !test || !Array.isArray(test) || test.length === 0 || !time) {
      res.status(400).json({ error: 'Необходимо указать имя теста, описание, время и вопросы' });
      return;
    }

    const isValidTest = test.every((question: Question) =>
      question.questionText && Array.isArray(question.options) && question.options.length > 0 &&
      question.options.every((option: Option) => option.text && typeof option.isCorrect === 'boolean')
    );

    if (!isValidTest) {
      res.status(400).json({ error: 'Каждый вопрос должен содержать текст и массив опций, каждая опция должна содержать текст и флаг правильности' });
      return;
    }

    const closedQuestion = await ClosedQuestionTestModel.create({
      name,
      description,
      test,
      time,
    });

    res.status(201).json(closedQuestion);
  } catch (error) {
    console.error('Ошибка при создании теста с закрытыми вопросами:', error);
    res.status(500).json({ error: 'Произошла ошибка при создании теста с закрытыми вопросами' });
  }
};

export const getAllClosedQuestionsTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const closedQuestions = await ClosedQuestionTestModel.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(closedQuestions);
  } catch (error) {
    console.error('Ошибка при получении тестов с закрытыми вопросами:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении тестов с закрытыми вопросами' });
  }
};

export const deleteClosedQuestionTest = async (req: Request, res: Response): Promise<void> => {
  try {
    const { questionId } = req.params;

    const deletedQuestion = await ClosedQuestionTestModel.destroy({ where: { id: questionId } });

    if (!deletedQuestion) {
      res.status(404).json({ message: 'Вопрос не найден' });
      return;
    }

    res.status(200).json({ message: 'Вопрос успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении теста с закрытыми вопросами:', error);
    res.status(500).json({ error: 'Произошла ошибка при удалении теста с закрытыми вопросами' });
  }
};

export const getClosedQuestionTestById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { questionId } = req.params;

    const closedQuestion = await ClosedQuestionTestModel.findByPk(questionId);

    if (!closedQuestion) {
      res.status(404).json({ message: 'Тест с закрытыми вопросами не найден' });
      return;
    }

    res.status(200).json(closedQuestion);
  } catch (error) {
    console.error('Ошибка при получении теста с закрытыми вопросами по id:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении теста с закрытыми вопросами по id' });
  }
};
