const request = require('supertest');
const express = require('express');
const parentRouter = require('../../api/parent/parentRouter');
const Parents = require('../../api/parent/parentModel');

const server = express();
server.use(express.json());

jest.mock('../../api/parent/parentModel');
jest.mock('../../api/children/childrenModel');
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

beforeAll(() => {
  server.use('/parents', parentRouter);
  jest.clearAllMocks();
});

describe('GET /parents/:profile_id/children', () => {
  test('should return 200', async () => {
    const mockChildren = [];
    Parents.getParentChildren.mockResolvedValue(mockChildren);
    const res = await request(server).get('/parents/1/children');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockChildren);
  });

  test('should return 404', async () => {
    Parents.getParentChildren.mockResolvedValue(null);
    const res = await request(server).get('/parents/1/children');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('should return 500', async () => {
    Parents.getParentChildren.mockRejectedValue(new Error('bad'));
    const res = await request(server).get('/parents/1/children');

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error', 'bad');
  });
});

describe('GET /parents/:profile_id/schedules', () => {
  test('should return 200', async () => {
    const mockSchedules = [];
    Parents.getChildSchedules.mockResolvedValue(mockSchedules);
    const res = await request(server).get('/parents/1/schedules');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSchedules);
  });

  test('should return 404', async () => {
    Parents.getChildSchedules.mockResolvedValue(null);
    const res = await request(server).get('/parents/1/schedules');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('should return 500', async () => {
    Parents.getChildSchedules.mockRejectedValue(new Error('bad'));
    const res = await request(server).get('/parents/1/schedules');

    expect(res.status).toBe(500);
    expect(res.body.error).toMatch('bad');
    expect(res.body).toHaveProperty('error', 'bad');
  });
});
