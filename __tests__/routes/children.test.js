const request = require('supertest');
const express = require('express');
const childrenRouter = require('../../api/children/childrenRouter');
const Children = require('../../api/children/childrenModel');

const server = express();
server.use(express.json());

const mockChild = {
  child_id: 1,
  profile_id: 5,
  username: 'ILoveFortnite',
  age: 8,
  parent_id: 1,
};

jest.mock('../../api/children/childrenModel');
jest.mock('../../api/middleware/roleAuthentication', () => {
  return { roleAuthenticationParent: jest.fn((req, res, next) => next()) };
});
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => {
    req.profile = {
      profile_id: 4,
      role_id: 4,
    };
    next();
  })
);
jest.mock('../../api/children/childrenMiddleware', () => {
  return {
    checkChildExist: jest.fn((req, res, next) => next()),
    isChildAlreadyEnrolled: jest.fn((req, res, next) => next()),
    isChildParent: jest.fn((req, res, next) => next()),
    checkChildObject: jest.fn((req, res, next) => next()),
  };
});

beforeAll(() => {
  server.use('/children', childrenRouter);
  jest.clearAllMocks();
});

describe('GET /children', () => {
  test('should return 200', async () => {
    const mockChildren = [];
    Children.getChildren.mockResolvedValue(mockChildren);
    const res = await request(server).get('/children');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockChildren);
  });

  test('should return 500', async () => {
    Children.getChildren.mockRejectedValue(new Error('bad'));
    const res = await request(server).get('/children');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('bad');
  });
});

describe('POST /children', () => {
  test('should return 201', async () => {
    Children.addChild.mockResolvedValue(mockChild);
    const res = await request(server).post('/children').send(mockChild);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(mockChild);
  });

  test('should return 500', async () => {
    Children.addChild.mockRejectedValue(new Error('bad'));
    const res = await request(server).post('/children').send(mockChild);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch('bad');
  });
});

describe('PUT /children/:child_id', () => {
  test('should return 200', async () => {
    Children.updateChild.mockResolvedValue({ ...mockChild, username: 'kiddo' });
    const res = await request(server).put('/children/1');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ ...mockChild, username: 'kiddo' });
  });

  test('should return 500', async () => {
    Children.updateChild.mockRejectedValue(new Error('bad'));
    const res = await request(server).put('/children/1');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('bad');
  });
});

describe('DELETE /children/:child_id', () => {
  test('should return 200', async () => {
    Children.removeChild.mockResolvedValue({ ...mockChild, name: 'kiddo' });
    const res = await request(server).delete('/children/1');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body.name).toBe('kiddo');
  });

  test('should return 500', async () => {
    Children.removeChild.mockRejectedValue(new Error('bad'));
    const res = await request(server).delete('/children/1');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('bad');
  });
});

describe('GET /children/:child_id/enrollments', () => {
  test('should return 200', async () => {
    const mockCourses = [
      { course_name: 'coding101', instructor_name: 'teach', course_id: 1 },
      { course_name: 'coding204', instructor_name: 'teacher', course_id: 2 },
    ];
    Children.getEnrolledCourses.mockResolvedValue(mockCourses);
    const res = await request(server).get('/children/1/enrollments');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body).toEqual([
      { course_name: 'coding101', instructor_name: 'teach', course_id: 1 },
      { course_name: 'coding204', instructor_name: 'teacher', course_id: 2 },
    ]);
  });

  test('should return 500', async () => {
    Children.getEnrolledCourses.mockRejectedValue(new Error('bad'));
    const res = await request(server).get('/children/1/enrollments');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('bad');
  });
});
