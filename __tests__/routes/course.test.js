const request = require('supertest');
const express = require('express');
const Courses = require('../../api/course/courseModel');
const courseRouter = require('../../api/course/courseRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/course/courseModel.js');
jest.mock('../../api/middleware/authRequired.js', () =>
  jest.fn((req, res, next) => next())
);

describe('courses router endpoints', () => {
  beforeAll(() => {
    server.use(['/course', '/courses'], courseRouter);
    jest.clearAllMocks();
  });

  describe('GET /courses', () => {
    it('should return 200', async () => {
      Courses.getCourses.mockResolvedValue([]);
      const res = await request(server).get('/courses');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Courses.getCourses.mock.calls.length).toBe(1);
    });
  });

  describe('GET /courses/:name', () => {
    it('should return 200 when course is found', async () => {
      Courses.findByName.mockResolvedValue({
        subject: 'CS101',
      });
      const res = await request(server).get('/courses/CS101');

      expect(res.status).toBe(200);
      expect(res.body.subject).toBe('CS101');
      expect(Courses.findByName.mock.calls.length).toBe(1);
    });

    it('Should return 404 when no course found', async () => {
      Courses.findByName.mockResolvedValue();
      const res = await request(server).get('/courses/CS101B');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('CourseNotFound');
    });
  });

  describe('POST /course', () => {
    it('Should return 200 when course is added', async () => {
      const course = {
        subject: 'CS101BA',
        description: 'New Test Course',
      };
      Courses.findByName.mockResolvedValue([]);
      Courses.addCourse.mockResolvedValue([course]);

      const res = await request(server).post('/courses').send(course);

      expect(res.status).toBe(200);
      expect(Courses.addCourse.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /course', () => {
    it('should return 200 when course is created', async () => {
      const course = {
        subject: 'CS101',
        description: 'Testing PUT Course',
      };
      Courses.findByName.mockResolvedValue(course.subject);
      Courses.updateCourse.mockResolvedValue([course]);

      const res = await request(server).put('/courses').send(course);
      expect(res.status).toBe(200);
      expect(res.body.course.description).toBe('Testing PUT Course');
      expect(Courses.updateCourse.mock.calls.length).toBe(1);
    });
  });
});
