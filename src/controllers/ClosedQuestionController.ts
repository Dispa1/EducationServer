import { Request, Response } from 'express';
import ClosedQuestionTestModel from '../models/ClosedQuestionTestModel';
import News from '../models/News';
import Analytics from '../models/AnaliticsModel';

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  questionText: string;
  options: Option[];
}

interface UserAnswer {
  questionId: number;
  optionId: number;
}

export function generateId(): number {
  return Math.floor(Math.random() * 1000000);
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

    const modifiedTest = test.map((question: Question) => {
      const modifiedQuestion = { ...question, id: generateId() };
      modifiedQuestion.options = question.options.map((option: Option) => ({ ...option, id: generateId() }));
      return modifiedQuestion;
    });

    const closedQuestion = await ClosedQuestionTestModel.create({
      name,
      description,
      test: modifiedTest,
      time,
    });

    await News.create({
      name,
      text: description,
      type: 'closed_question_test'
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

    const modifiedClosedQuestions = closedQuestions.map((question) => {
      return {
        ...question.toJSON(),
        test: question.test.map((q: Question) => ({
          ...q,
          options: q.options.map((option: Option) => {
            const { isCorrect, ...rest } = option;
            return rest;
          }),
        })),
      };
    });

    res.status(200).json(modifiedClosedQuestions);
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

    const modifiedClosedQuestion = {
      ...closedQuestion.toJSON(),
      test: closedQuestion.test.map((q: Question) => ({
        ...q,
        options: q.options.map((option: Option) => {
          const { isCorrect, ...rest } = option;
          return rest;
        }),
      })),
    };

    res.status(200).json(modifiedClosedQuestion);
  } catch (error) {
    console.error('Ошибка при получении теста с закрытыми вопросами по id:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении теста с закрытыми вопросами по id' });
  }
};

export const checkAnswers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { testId, answers, userId, userName }: { testId: string, answers: UserAnswer[], userId: string, userName: string } = req.body;

    const test = await ClosedQuestionTestModel.findByPk(testId);

    if (!test) {
      res.status(404).json({ message: 'Тест не найден' });
      return;
    }

    const questions = test.test;

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    for (const answer of answers) {
      const question = questions.find(q => q.id === answer.questionId);

      if (!question) {
        res.status(400).json({ message: `Вопрос с id ${answer.questionId} не найден в тесте` });
        return;
      }

      const selectedOption = question.options.find(option => option.id === answer.optionId);

      if (!selectedOption) {
        res.status(400).json({ message: `Ответ с id ${answer.optionId} не найден для вопроса с id ${answer.questionId}` });
        return;
      }

      if (selectedOption.isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }

    unansweredCount = questions.length - (correctCount + incorrectCount);

    await Analytics.create({
      type: 'Тест с закрытыми вопросами',
      userId: userId,
      userName: userName,
      testId: testId,
      testName: test.name,
      correctAnswersCount: correctCount,
      incorrectAnswersCount: incorrectCount,
      unansweredQuestionsCount: unansweredCount,
    });

    res.status(200).json({ correctCount, incorrectCount, unansweredCount });
  } catch (error) {
    console.error('Ошибка при проверке ответов:', error);
    res.status(500).json({ message: 'Произошла ошибка при проверке ответов' });
  }
};