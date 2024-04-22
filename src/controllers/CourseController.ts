import { Request, Response } from 'express';
import Course from '../models/CourseModel';
import sequelize from 'sequelize';

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, image, subSections, description } = req.body;

    if (!title || !subSections || !Array.isArray(subSections) || subSections.length === 0) {
      res.status(400).json({ error: 'Необходимо указать название курса и подразделы' });
      return;
    }

    const course = await Course.create({
      title,
      image,
      subSections,
      description: description || ''
    });

    res.status(201).json(course);
  } catch (error) {
    console.error('Ошибка при создании курса:', error);
    res.status(500).json({ error: 'Произошла ошибка при создании курса' });
  }
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const { title, image, subSections } = req.body;

    const course = await Course.findByPk(courseId);
    if (!course) {
      res.status(404).json({ error: 'Курс не найден' });
      return;
    }

    if (title) course.title = title;
    if (image) course.image = image;
    if (subSections) course.subSections = subSections;

    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.error('Ошибка при обновлении курса:', error);
    res.status(500).json({ error: 'Произошла ошибка при обновлении курса' });
  }
};

export const getAllCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = await Course.findAll({
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'title', 
        'image', 
        [sequelize.literal('SUBSTRING(description, 1, 255)'), 'description'],
        'createdAt'
      ]
    });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Ошибка при получении всех курсов:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении всех курсов' });
  }
};

export const deleteCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;

    const deletedCourse = await Course.destroy({ where: { id: courseId } });

    if (deletedCourse) {
      res.status(200).json({ message: 'Курс успешно удален' });
    } else {
      res.status(404).json({ message: 'Курс не найден' });
    }
  } catch (error) {
    console.error('Ошибка при удалении курса:', error);
    res.status(500).json({ error: 'Произошла ошибка при удалении курса' });
  }
};

export const getCourseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;

    const course = await Course.findByPk(courseId);

    if (!course) {
      res.status(404).json({ error: 'Курс не найден' });
      return;
    }

    res.status(200).json(course);
  } catch (error) {
    console.error('Ошибка при получении курса по id:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении курса по id' });
  }
};