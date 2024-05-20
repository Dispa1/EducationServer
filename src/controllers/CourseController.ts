import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { v4 as uuidv4 } from 'uuid';
import Course from '../models/CourseModel';
import News from '../models/News';
import sequelize from 'sequelize';
import multer from 'multer';

const writeFileAsync = promisify(fs.writeFile);

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, subSections, description } = req.body;

    if (!title || !subSections || !Array.isArray(JSON.parse(subSections))) {
      res.status(400).json({ error: 'Необходимо указать название курса и подразделы' });
      return;
    }

    let imagePath = null;
    if (req.file) {
      const imageExtension = path.extname(req.file.originalname);
      const imageName = `${uuidv4()}${imageExtension}`;
      const imageDir = path.join(__dirname, '../public/images');
      imagePath = `/images/${imageName}`;

      await writeFileAsync(path.join(imageDir, imageName), req.file.buffer);
    }

    const course = await Course.create({
      title,
      image: imagePath,
      subSections: JSON.parse(subSections),
      description: description,
    });

    await News.create({
      name: title,
      image: imagePath,
      text: description || '',
      type: 'course',
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
        'createdAt',
        [
          sequelize.literal(`CONCAT('${process.env.BASE_URL}', image)`),
          'imageUrl'
        ]
      ],
      raw: true
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

    const imageUrl = course.image ? `${process.env.BASE_URL}${course.image}` : null;

    const courseData = {
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
      subSections: course.subSections,
      imageUrl: imageUrl,
    };

    res.status(200).json(courseData);
  } catch (error) {
    console.error('Ошибка при получении курса по id:', error);
    res.status(500).json({ error: 'Произошла ошибка при получении курса по id' });
  }
};