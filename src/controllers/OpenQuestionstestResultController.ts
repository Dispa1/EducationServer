import { Request, Response } from 'express';
import OpenQuestionstestResult from '../models/OpenQuestionstestResultModel';
import OpenQuestionsTest, { Question } from '../models/OpenQuestionsTestModel';

export const createUserTestResult = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, full_name, testId, testName, answers } = req.body;

    if (!userId || !full_name || !testId || !testName || !answers) {
      res.status(400).json({ error: 'Необходимо указать userId, fullname, testId, testName и answers' });
      return;
    }

    // Получаем модель теста
    const test = await OpenQuestionsTest.findByPk(testId);
    if (!test) {
      res.status(404).json({ error: 'Тест не найден' });
      return;
    }

    // Парсим тест для получения вопросов
    const questions: Question[] = test.test;

    // Создаем массив данных для сохранения в ответах, включая правильный ответ
    const userAnswers = answers.map((answer: any) => {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) {
        throw new Error(`Вопрос с id ${answer.questionId} не найден в тесте`);
      }
      return {
        questionId: answer.questionId,
        questionText: answer.questionText,
        userAnswer: answer.userAnswer,
        correctAnswer: question.correctAnswer, // Добавляем правильный ответ
      };
    });

    // Создаем результат теста пользователя
    const userTestResult = await OpenQuestionstestResult.create({
      userId,
      full_name,
      testId,
      testName,
      answers: userAnswers,
    });

    res.status(201).json(userTestResult);
  } catch (error) {
    console.error('Ошибка при создании результата теста пользователя:', error);
    res.status(500).json({ error: 'Произошла ошибка при создании результата теста пользователя' });
  }
};

// Контроллер для получения всех ответов пользователя
export const getAllUserTestResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const userTestResults = await OpenQuestionstestResult.findAll({
      attributes: ['id', 'userId', 'testId', 'full_name', 'testName', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(userTestResults);
  } catch (error) {
    console.error('Ошибка при получении ответов пользователей:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении ответов пользователей' });
  }
};

// Контроллер для получения одного OpenQuestionstestResult по его id
export const getOpenQuestionstestResultById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Находим результат теста по ID
    const userTestResult = await OpenQuestionstestResult.findByPk(id);

    if (!userTestResult) {
      res.status(404).json({ error: 'Результат теста не найден' });
      return;
    }

    res.status(200).json(userTestResult);
  } catch (error) {
    console.error('Ошибка при получении результата теста:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении результата теста' });
  }
};
