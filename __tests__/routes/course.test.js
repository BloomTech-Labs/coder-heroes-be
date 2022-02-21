const request = require('supertest');
const express = require('express');
const Courses = require('../../api/courseTypes/courseTypesModel');
const courseRouter = require('../../api/courseTypes/courseTypesRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/courseTypes/courseTypesModel.js');
jest.mock('../../api/middleware/authRequired.js', () =>
  jest.fn((req, res, next) => next())
);

describe('courses router endpoints', () => {
  beforeAll(() => {
    server.use(['/course-type', '/course-types'], courseRouter);
    jest.clearAllMocks();
  });

  describe('GET /courses-type', () => {
    it('should return 200', async () => {
      Courses.getAllCourseTypes.mockResolvedValue([]);
      const res = await request(server).get('/course-type');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Courses.getAllCourseTypes.mock.calls.length).toBe(1);
    });
  });

  describe('GET /courses-type/:name', () => {
    it('should return 200 when course is found', async () => {
      Courses.findBySubject.mockResolvedValue({
        subject: 'CS101',
      });
      const res = await request(server).get('/course-type/CS101');

      expect(res.status).toBe(200);
      expect(res.body.subject).toBe('CS101');
      expect(Courses.findBySubject.mock.calls.length).toBe(1);
    });

    it('Should return 404 when no course found', async () => {
      Courses.findBySubject.mockResolvedValue();
      const res = await request(server).get('/course-type/CS101B');

      expect(res.status).toBe(404);
    });
  });

  describe('POST /course-type', () => {
    it('Should return 200 when course is added', async () => {
      const course = {
        subject: 'CS101BA',
        description: 'New Test Course',
      };
      Courses.findBySubject.mockResolvedValue([]);
      Courses.addCourseType.mockResolvedValue([course]);

      const res = await request(server).post('/course-type').send(course);

      expect(res.status).toBe(200);
      expect(Courses.addCourseType.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /course-type', () => {
    it('should return 200 when course is created', async () => {
      const course = {
        subject: 'CS101',
        description: 'Testing PUT Course',
      };
      Courses.findBySubject.mockResolvedValue(course.subject);
      Courses.updateCourseType.mockResolvedValue([course]);

      const res = await request(server).put('/course-type').send(course);
      expect(res.status).toBe(200);
      expect(res.body).toBe('CS101');
      expect(Courses.updateCourseType.mock.calls.length).toBe(1);
    });
  });
});
